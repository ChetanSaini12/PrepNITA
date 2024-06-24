import { GraphQLError } from 'graphql'
import { prisma } from '../../../../prisma/index.js'

export const deleteExpReply = async (_, payload, context) => {
  try {
    /*
            payload : {
                replyId
            }
            // Only either replier or SuperAdmin can delete a comment
        */
    const { replyId } = payload

    const { replierId } = await prisma.expReply.findFirst({
      where: {
        id: replyId,
      },
    })
    if (replierId) {
      if (replierId == context.userId || context.isSuperAdmin) {
        const deletedReply = await prisma.expReply.delete({
          where: {
            id: replyId,
          },
        })

        return deletedReply
      }
      else 
      {
          throw new GraphQLError("You are not allowed to delete this reply", {
            extensions: {
              code: 'NOT_AUTHORISED',
            },
          })
      }
    } else {
      throw new GraphQLError("Reply Doesn't exist", {
        extensions: {
          code: 'REPLY_NOT_FOUND',
        },
      })
    }
  } catch (error) {
    if (
        error &&
        error.extensions &&
        (error.extensions.code === 'NOT_AUTHORISED' ||
            error.extensions.code === 'REPLY_NOT_FOUND')
    ) {
        throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
