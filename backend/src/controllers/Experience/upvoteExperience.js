import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addNameExp } from './addnameExp.js'

export const upvoteExperience = async (_, payload, context) => {
  try {
    if (context.isUser) {
      let experience = await prisma.experience.update({
        where: {
          id: payload.id,
        },
        data: {
          upvotes: {
            increment: 1,
          },
        },
        include: {
          comments : true
        },
      })
      experience = addNameExp(experience)
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
