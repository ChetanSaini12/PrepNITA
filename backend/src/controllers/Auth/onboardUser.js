import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const onboardUser = async (_, payload, context) => {
  try {
    if (context && context.userId) {
      console.log('UserInput for Onboarding: ' + JSON.stringify(payload.user))

      const usernameExist = await prisma.user.findFirst({
        where: { username: payload.user.username },
      })

      if (usernameExist) {
        throw new GraphQLError(
          'Username already exist, Please Select a different.',
          {
            extensions: {
              code: 'USERNAME_ALREADY_EXISTS',
            },
          }
        )
      }

      const user = await prisma.user.update({
        where: { id: context.userId },
        data: {
          authentication: {
            update: {
              isBoarded: true,
            },
          },
          ...payload.user,
        },
      })

      return user
    }

    throw new GraphQLError('User is not registered yet!!', {
      extensions: {
        code: 'NOT_REGISTERED',
      },
    })
  } catch (error) {
    console.log('Error while onboarding user : ', error)
    if (
      error.extensions &&
      (error.extensions.code === 'USERNAME_ALREADY_EXISTS' ||
        error.extensions.code === 'NOT_REGISTERED')
    ) {
      throw error
    } else {
      throw new GraphQLError('Error while onboarding user', {
        extensions: {
          code: 'ONBOARD_FAILED',
        },
      })
    }
  }
}
