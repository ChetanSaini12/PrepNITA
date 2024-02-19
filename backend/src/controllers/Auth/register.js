import { prisma } from '../../prisma/index.js'
import { GraphQLError } from 'graphql'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import otpGenerator from 'otp-generator'
import moment from 'moment'
import sendEmail from '../../email/send.email.js'

const generateJwtToken = (id) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
  return token
}

const registerUser = async (_, payload) => {
  const email = payload.email
  const existingUser = await prisma.user.findFirst({
    where: { email },
  })

  if (!existingUser) {
    if (!(email.includes('@') && email.includes('.', email.indexOf('@')))) {
      throw new GraphQLError('Invalid Email!!', {
        extensions: {
          code: 'INVALID_EMAIL',
        },
      })
    }

    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(payload.password, 10),
      },
    })
  }

  const user = await prisma.user.findFirst({
    where: { email },
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
}

const verifyMail = async (_, payload) => {
  const email = payload.email
  const existingUser = await prisma.user.findFirst({
    where: { email },
  })
  if (!existingUser) {
    throw new GraphQLError('User is not found!!', {
      extensions: {
        code: 'USER_NOT_FOUND',
      },
    })
  }

  // Generate Otp for Email verification
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })

  // Calculate expiry time as 10 minutes from current time
  const expiryTime = moment().add(5, 'minutes')

  // Set OTP and OtpExpiry in user

  await prisma.user.update({
    where: { email },
    data: {
      otpForEmail: otp,
      otpEmailExpiry: expiryTime,
    },
  })

  // Send email with otp for verification

  try {
    const messageBody = {
      subject: 'PrepNITA : Email Verification',
      template: 'verifymail',
      context: {
        otp: otp,
      },
    }

    await sendEmail(email, messageBody)

    return 'Email Sent successfully!!'
  } catch (error) {
    throw new GraphQLError('Error sending email', {
      extensions: {
        code: 'Email_For_Verification_Failed',
      },
    })
  }
}

const checkOtpForEmail = async (_, payload) => {
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

export {registerUser, verifyMail, checkOtpForEmail}

// const signinUser = async (_, payload) => {
//   const user = await prisma.user.findFirst({
//     where: { email: payload.email },
//   })

//   if (user) {
//     const isValid = await bcrypt.compare(payload.password, user.password)

//     if (!isValid) {
//       throw new GraphQLError('Passwords do not match!!', {
//         extensions: {
//           code: 'PASSWORDS_DO_NOT_MATCH',
//         },
//       })
//     }

//     if (user.isVerified === false) {
//       throw new GraphQLError('Email not verified!!', {
//         extensions: {
//           code: 'EMAIL_NOT_VERIFIED',
//         },
//       })
//     }

//     const token = generateJwtToken(user.id)

//     return {
//       token,
//       user,
//     }
//   }

//   throw new GraphQLError('User not found!!', {
//     extensions: {
//       code: 'USER_NOT_FOUND',
//     },
//   })
// }

// const createUserInDB = async (_, payload) => {
//   console.log('Creating user', payload)

//   const existingUser = await prisma.user.findFirst({
//     where: { email: payload.User.email },
//   })

//   if (existingUser) {
//     console.log('User already exist : ', existingUser)
//     throw new GraphQLError('User already exist ', {
//       extensions: {
//         code: 'USER_ALREADY_EXISTS',
//       },
//     })
//   }

//   const hashedPassword = await bcrypt.hash(payload.User.password, 10)
//   payload.User.password = hashedPassword

//   const user = await prisma.user.create({
//     data: payload.User,
//   })

//   const token = generateJwtToken(user.id)

//   console.log('TOKEN', token)

//   const loginUserWithJWT = {
//     token,
//     user,
//   }

//   return loginUserWithJWT
// }

// const createUserInDB = async (_, payload) => {
//   console.log('Creating user', payload)

//   const existingUser = await prisma.user.findFirst({
//     where: {
//       OR: [{ email: payload.User.email }, { username: payload.User.username }],
//     },
//   })

//   if (existingUser) {
//     console.log('User already exist : ', existingUser)
//     throw new GraphQLError('User already exist ', {
//       extensions: {
//         code: 'USER_ALREADY_EXISTS',
//       },
//     })
//   }

//   const hashedPassword = await bcrypt.hash(payload.User.password, 10)
//   payload.User.password = hashedPassword

//   const user = await prisma.user.create({
//     data: payload.User,
//   })

//   const token = generateJwtToken(user.id);

//   console.log('TOKEN', token)

//   const loginUserWithJWT = {
//     token,
//     user
//   }

//   return loginUserWithJWT;
// }

// const loginUser = async (_, payload) => {
//   console.log('Logging in user', payload)

//   const user = await prisma.user.findFirst({
//     where: {
//       OR: [{ email: payload.email }, { username: payload.username }],
//     },
//   })

//   if (!user) {
//     console.log('NO USER', user)
//     throw new GraphQLError('User does not exist ', {
//       extensions: {
//         code: 'USER_DOES_NOT_EXIST',
//       },
//     })
//   }

//   // compare passwords
//   const isMatch = await bcrypt.compare(payload.password, user.password)

//   if (!isMatch) {
//     console.log('PASSWORDS DO NOT MATCH', isMatch)
//     throw new GraphQLError('Passwords do not match ', {
//       extensions: {
//         code: 'PASSWORDS_DO_NOT_MATCH',
//       },
//     })
//   }

//   const token = generateJwtToken(user.id)

//   console.log('TOKEN', token)

//   const loginUserWithJWT = {
//     token,
//     user,
//   }

//   return loginUserWithJWT
// }

// export { createUserInDB, loginUser }
