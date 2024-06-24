import { GraphQLError } from 'graphql'
import { prisma } from '../../../../prisma/index.js'

export const addReplyToExpComment = async (_, payload, context) => {
  try {
    /*
            payload : 
                {
                    description : String ("A good comment")
                    expcommentId : Int
                }
        */
    const comment = await prisma.expComment.findFirst({
      where: {
        id: payload.expcommentId,
      },
    })
    if(!comment)
        {
            throw new GraphQLError("Comment Doesn't exist!!", {
                extensions : {
                    code : "NO_COMMENT"
                }
            })
        }
    if (context.isUser) {
      const expReply = await prisma.expReply.create({
        data: {
          description: payload.description,
          expcommentId: payload.expcommentId,
          replierId: context.userId,
        },
      })
      return expReply
    } else {
      throw new GraphQLError('User is not authorised', {
        extensions: {
          code: 'NOT_AUTH',
        },
      })
    }
  } catch (error) {
    if (error & error.extensions && (error.extensions.code == 'NOT_AUTH' || error.extensions.code == 'NO_COMMENT')) {
      throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
