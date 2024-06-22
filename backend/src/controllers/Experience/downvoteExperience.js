import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const downvoteExperience = async (_, payload, context) => {
  try {
    if (context.isUser) {
      const experience = await prisma.experience.update({
        where: {
          id: payload.id,
        },
        data: {
          downvotes: {
            decrement: 1,
          },
        },
      })
      return experience
    } else {
      throw new GraphQLError('You are not authorised user!!', {
        extensions: {
          code: 'USER_IS_NOT_AUTHORISED',
        },
      })
    }
  } catch (error) {
    if (
      error &&
      error.extensions &&
      error.extensions.code === 'USER_IS_NOT_AUTHORISED'
    ) {
      throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
