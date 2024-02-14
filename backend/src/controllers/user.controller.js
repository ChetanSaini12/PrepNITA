import { GraphQLError } from 'graphql'
import { prisma } from '../../prisma/index.js'

const getAllUserData = async () => {
  console.log('Get All User Data')
  const users = await prisma.$queryRaw`SELECT * FROM "User"`
  console.log(users)
  return users
}

const getCurrentUser = async (_, __, context) => {
  if (context && context.userId) {
    try {
      const user = await getUserById(_, context.userId)
      console.log('Current User : ', user)
      return user
    } catch (error) {
      throw new GraphQLError('I dont know who are you', {
        extensions: {
          code: 'INVALID_USER_ID',
        },
      })
    }
  }
  throw new GraphQLError('I dont know who are you', {
    extensions: {
      code: 'INVALID_TOKEN',
    },
  })
}

const getUserById = async (_, id) => {
  try {
    console.log('GETTING USER -> id : ', id)
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })
    return user
  } catch (error) {
    console.log('ERROR WHILE FINDING USER BY ID : ', error)
    throw new GraphQLError('I dont know who are you', {
      extensions: { code: 'INVALID_ID' },
    })
  }
}

const updateUserRole = async (_, payload, context) => {
  if (context.isManager) {
    console.log('Update User Role', payload)
    try {
      const user = await prisma.user.update({
        where: { id: payload.id },
        data: { role: payload.role },
      })
      return user.role
    } catch (error) {
      console.log('ERRROR : ', error)
      throw new GraphQLError('Something went wrong while updating user role', {
        extensions: {
          code: 'ROLE_UPDATE_FAILED',
        },
      })
    }
  }

  throw new GraphQLError('You are not an authorised manager!!', {
    extensions: {
      code: 'NOT_AUTHORISED_MANAGER',
    },
  })
}

export { getAllUserData, getCurrentUser, updateUserRole, getUserById }
