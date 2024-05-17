import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const updateUserRole = async (_, payload, context) => {
  if (context.isManager) {
    console.log('Update User Role', payload)
    try {
      const user = await prisma.user.update({
        where: { id: payload.id },
        data: {
          userInformation: {
            update: {
              role: payload.role,
            },
          },
        },
        include: {
          userInformation: true,
        },
      })
      return user.userInformation.role
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
