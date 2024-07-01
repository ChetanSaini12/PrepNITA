import { GraphQLError } from 'graphql'
import { prisma } from '../../../../prisma/index.js'
import { addUserName } from './addUserName.js'
import { addLikeStatus } from '../../../utils/addLikeStatus.js'

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
          area: 'EXP_COMMENT',
          areaId: payload.commentId,
        },
      })
      if (voteEntry) {
        await prisma.userVotes.delete({
          where: {
            id: voteEntry.id,
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
          include: {
            reply: true,
          },
        })
        likedComment = await addLikeStatus(
          likedComment,
          context.userId,
          'EXP_COMMENT'
        )
        likedComment = await addUserName(likedComment)
        for (let i = 0; i < likedComment.reply.length; i++) {
          likedComment.reply[i] = await addLikeStatus(
            likedComment.reply[i],
            context.userId,
            'EXP_REPLY'
          )
        }
        return likedComment
      }
      await prisma.userVotes.create({
        data: {
          userId: context.userId,
          area: 'EXP_COMMENT',
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
        include: {
          reply: true,
        },
      })
      likedComment = await addLikeStatus(
        likedComment,
        context.userId,
        'EXP_COMMENT'
      )
      likedComment = await addUserName(likedComment)
      for (let i = 0; i < likedComment.reply.length; i++) {
        likedComment.reply[i] = await addLikeStatus(
          likedComment.reply[i],
          context.userId,
          'EXP_REPLY'
        )
      }
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
    console.log('Error while liking comment : ', error)
    throw new GraphQLError('Something went wrong!!')
  }
}
