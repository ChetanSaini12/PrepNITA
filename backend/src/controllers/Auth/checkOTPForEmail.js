import moment from "moment"
import { prisma } from "../../../prisma"
import { generateJwtToken } from "./generateJWT"
import { GraphQLError } from "graphql"

export const checkOtpForEmail = async (_, payload) => {
    const { email, otp } = payload
  
    const existingUser = await prisma.user.findFirst({
      where: { email },
    })
  
    if (existingUser) {
      if (existingUser.otpForEmail) {
        if (existingUser.otpEmailExpiry >= moment()) {
          if (existingUser.otpForEmail === otp) {
            await prisma.authentication.update({
              where: { userId: existingUser.id },
              data: {
                isVerified: true,
                otpForEmail: null,
                otpEmailExpiry: null,
              },
            })
            const user = await prisma.user.findFirst({
              where: { userId: existingUser.id },
              select: {
                id: true,
                email: true,
                username: true,
                name: true,
                role: true,
                mobileNum: true,
                authentications: {
                  select: {
                    isVerified: true,
                    isBoarded: true,
                  },
                },
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
      throw new GraphQLError('User not found!!', {
        extensions: {
          code: 'USER_NOT_FOUND',
        },
      })
    }
  }