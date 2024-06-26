import { GraphQLError } from 'graphql'
import { prisma } from '../../../../prisma/index.js'
import { addUserName } from './addUserName.js'

export const deleteExpComment = async (_, payload, context) => {
  try {
    /*
            payload : {
                commentId
            }
            // Only either commentor or SuperAdmin can delete a comment
        */
    const { commentId } = payload

    const { commentorId } = await prisma.expComment.findFirst({
      where: {
        id: commentId,
      },
    })
    if (commentorId) {
      if (commentorId == context.userId || context.isSuperAdmin) {
        await prisma.expReply.deleteMany({
          where: {
            expcommentId: commentId,
          },
        })

        let deletedComment = await prisma.expComment.delete({
          where: {
            id: commentId,
          },
        })
        deletedComment = addUserName(deletedComment)
        return deletedComment
      }
      else 
      {
          throw new GraphQLError("You are not allowed to delete this comment", {
            extensions: {
              code: 'NOT_AUTHORISED',
            },
          })
      }
    } else {
      throw new GraphQLError("Comment Doesn't exist", {
        extensions: {
          code: 'COMMENT_NOT_FOUND',
        },
      })
    }
  } catch (error) {
    if (
        error &&
        error.extensions &&
        (error.extensions.code === 'NOT_AUTHORISED' ||
            error.extensions.code === 'COMMENT_NOT_FOUND')
    ) {
        throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
