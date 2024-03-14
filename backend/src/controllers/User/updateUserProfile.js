import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const updateUserProfile = async (_, payload, context) => {
  if (context && context.userId) {
    console.log('Update User Profile', payload)
    try {
      const user = await prisma.user.update({
        where: { id: context.userId },
        data: { userInformation : {
          update : {
            ...payload.user
          }
        } },
      })
      return user
    } catch (error) {
      console.log('ERRROR : ', error)
      throw new GraphQLError(
        'Something went wrong while updating user profile',
        {
          extensions: {
            code: 'PROFILE_UPDATE_FAILED',
          },
        }
      )
    }
  }

  throw new GraphQLError('User is not registered yet!!', {
    extensions: {
      code: 'NOT_REGISTERED',
    },
  })
}
