import moment from 'moment'
import { prisma } from '../../../prisma/index.js'
import { generateJwtToken } from './generateJWT.js'
import { GraphQLError } from 'graphql'

export const checkOtpForEmail = async (_, payload) => {
  const { email, otp } = payload

  const existingUser = await prisma.user.findFirst({
    where: { email },
    include: {
      authentication: true,
    },
  })

  console.log('existingUser for otp verification : ', existingUser)

  try {
    if (existingUser) {
      if (!existingUser.authentication.isVerified) {
        if (existingUser.authentication.otpForEmail) {
          if (existingUser.authentication.otpEmailExpiry >= moment()) {
            if (existingUser.authentication.otpForEmail === otp) {
              await prisma.authentication.update({
                where: { userId: existingUser.id },
                data: {
                  isVerified: true,
                  otpForEmail: null,
                  otpEmailExpiry: null,
                },
              })
              console.log('Authenctication UPD Done')
              const user = await prisma.user.findFirst({
                where: { id: existingUser.id },
                include: {
                  authentication: true,
                },
              })

              const token = generateJwtToken(user.id)
              return {
                token,
                user,
              }
            } else {
              throw new GraphQLError('Invalid OTP!!', {
                extensions: {
                  code: 'INVALID_OTP',
                },
              })
            }
          } else {
            throw new GraphQLError('OTP Expired!!', {
              extensions: {
                code: 'OTP_EXPIRED',
              },
            })
          }
        } else {
          throw new GraphQLError('OTP not sent!!', {
            extensions: {
              code: 'OTP_NOT_SENT',
            },
          })
        }
      } else {
        throw new GraphQLError('You are already verified!!', {
          extensions: {
            code: 'ALREADY_VERIFIED',
          },
        })
      }
    } else {
      throw new GraphQLError('User not found!!', {
        extensions: {
          code: 'USER_NOT_FOUND',
        },
      })
    }
  } catch (error) {
    console.log('Error while checking otp for email : ', error)
    if (
      error.extensions &&
      (error.extensions.code === 'USER_NOT_FOUND' ||
        error.extensions.code === 'ALREADY_VERIFIED' ||
        error.extensions.code === 'OTP_NOT_SENT' ||
        error.extensions.code === 'OTP_EXPIRED' ||
        error.extensions.code === 'INVALID_OTP')
    ) {
      throw error
    } else {
      throw new GraphQLError('Error while checking otp for email', {
        extensions: {
          code: 'OTP_VERIFICATION_FAILED',
        },
      })
    }
  }
}
