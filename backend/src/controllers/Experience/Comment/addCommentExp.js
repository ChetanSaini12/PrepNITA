import { prisma } from '../../../../prisma/index.js'
import { GraphQLError } from 'graphql'
export const addComment = async (_, payload, context) => {
  try {
    /*
        payload : 
            {
                description : String ("A good experience")
                experienceId : Int
            }
        */
    if (context.isUser) {
      const expComment = await prisma.expComment.create({
        data: {
          description: payload.description,
          experienceId: payload.experienceId,
          commentorId: context.userId,
        },
      })
      return expComment
    } else {
      throw new GraphQLError('User is not authorised', {
        extensions: {
          code: 'NOT_AUTH',
        },
      })
    }
  } catch (error) {
    if (error & error.extensions && error.extensions.code == 'NOT_AUTH') {
      throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
