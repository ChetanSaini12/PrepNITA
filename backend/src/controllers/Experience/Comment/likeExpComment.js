import { GraphQLError } from 'graphql'
import { prisma } from '../../../../prisma/index.js'
import { addUserName } from './addUserName.js'

export const likeExpComment = async (_, payload, context) => {
  try {
    /*
        payload : {
            commentId
        }
        */
    const existingComment = await prisma.expComment.findFirst({
      where: {
        id: payload.commentId,
      },
    })
    if (!existingComment) {
      throw new GraphQLError('Comment does not exist!!', {
        extensions: {
          code: 'COMMENT_DOES_NOT_EXIST',
        },
      })
    }
    if (context.isUser) {
      const voteEntry = await prisma.userVotes.findFirst({
        where: {
          userId: context.userId,
          area: 'COMMENT',
          areaId: payload.commentId,
        },
      })
      if (voteEntry) {
        await prisma.userVotes.delete({
          where: {
            id: voteEntry.id
          },
        })
        let likedComment = await prisma.expComment.update({
          where: {
            id: payload.commentId,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        })
        likedComment = addUserName(likedComment)
        return likedComment
      }
      await prisma.userVotes.create({
        data: {
          userId: context.userId,
          area: 'COMMENT',
          areaId: payload.commentId,
          type: 'LIKE',
        },
      })
      let likedComment = await prisma.expComment.update({
        where: {
          id: payload.commentId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      })
      likedComment = addUserName(likedComment)
      return likedComment
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
      (error.extensions.code === 'USER_IS_NOT_AUTHORISED' ||
        error.extensions.code === 'COMMENT_DOES_NOT_EXIST')
    ) {
      throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
