import { GraphQLError } from 'graphql'
import { getUserById } from '../controllers/User/getUserById.js'

const checkRole = async ({ _, payload, context }, next) => {
  console.log('CONTEXT WHILE CHECKING ROLE', context)
  if (context && context.userId) {
    try {
      const user = await getUserById(_, context.userId)
      console.log('USERUSER : ', user)
      if (user.userInformation.role === 'MANAGER') {
        return next(_, payload, {
          ...context,
          isManager: true,
          isSuperAdmin: true,
          isAdmin: true,
          isUser: true,
        })
      } else if (user.userInformation.role === 'SUPERADMIN') {
        return next(_, payload, {
          ...context,
          isSuperAdmin: true,
          isAdmin: true,
          isUser: true,
        })
      } else if (user.userInformation.role === 'ADMIN') {
        return next(_, payload, {
          ...context,
          isAdmin: true,
          isUser: true,
        })
      } else if (user.userInformation.role === 'USER') {
        return next(_, payload, {
          ...context,
          isUser: true,
        })
      }
      throw new GraphQLError('You are not an authorised user!!', {
        extensions: {
          code: 'NOT_AUTHORISED',
        },
      })
    } catch (error) {
      throw new GraphQLError('I dont know who are you', {
        extensions: {
          code: 'INVALID_USER_ID',
        },
      })
    }
  } else {
    throw new GraphQLError('You are not an authorised user!!', {
      extensions: {
        code: 'NOT_AUTHORISED',
      },
    })
  }
}

export { checkRole }
