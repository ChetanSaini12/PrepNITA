import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import bcrypt from 'bcryptjs'
import { generateJwtToken } from './generateJWT.js'

export const registerUser = async (_, payload) => {
  try {
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
          authentication: { create : {} }
        },
      })
    }
    else {
      const isValid = await bcrypt.compare(payload.password, existingUser.password)
      if(!isValid) {
        throw new GraphQLError('Passwords do not match!!', {
          extensions: {
            code: 'PASSWORDS_DO_NOT_MATCH',
          },
        })
      }
    }
  
    const user = await prisma.user.findFirst({
      where: { email },
      include: {
        authentication: true
      }
    });
  
    console.log("Registered User: ", user);
    const token = generateJwtToken(user.id)
  
    return {
      token,
      user,
    }
  } catch (error) {
    console.log('Error while registering user : ', error);
    throw new GraphQLError('Error while registering user', {
      extensions: {
        code: 'REGISTRATION_FAILED',
      },
    })
  }
}


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
