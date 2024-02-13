import { prisma } from '../../prisma/index.js'
import { GraphQLError } from 'graphql'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateJwtToken = (id) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
  return token
}

const createUserInDB = async (_, payload) => {
  console.log('Creating user', payload)

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.User.email }, { username: payload.User.username }],
    },
  })

  if (existingUser) {
    console.log('User already exist : ', existingUser)
    throw new GraphQLError('User already exist ', {
      extensions: {
        code: 'USER_ALREADY_EXISTS',
      },
    })
  }

  const hashedPassword = await bcrypt.hash(payload.User.password, 10)
  payload.User.password = hashedPassword

  const user = await prisma.user.create({
    data: payload.User,
  })

  const token = generateJwtToken(user.id);

  console.log('TOKEN', token)

  const loginUserWithJWT = {
    token,
    user
  }

  return loginUserWithJWT;
}

const loginUser = async (_, payload) => {
  console.log('Logging in user', payload)

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }, { username: payload.username }],
    },
  })

  if (!user) {
    console.log('NO USER', user)
    throw new GraphQLError('User does not exist ', {
      extensions: {
        code: 'USER_DOES_NOT_EXIST',
      },
    })
  }

  // compare passwords
  const isMatch = await bcrypt.compare(payload.password, user.password)

  if (!isMatch) {
    console.log('PASSWORDS DO NOT MATCH', isMatch)
    throw new GraphQLError('Passwords do not match ', {
      extensions: {
        code: 'PASSWORDS_DO_NOT_MATCH',
      },
    })
  }

  const token = generateJwtToken(user.id);

  console.log('TOKEN', token)

  const loginUserWithJWT = {
    token,
    user
  }

  return loginUserWithJWT;
}


export { createUserInDB, loginUser }
