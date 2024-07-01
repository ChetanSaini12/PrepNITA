import { GraphQLError } from 'graphql'
import { prisma } from '../../../../prisma/index.js'
import { addUserName } from './addUserName.js'

export const likeExpCommentReply = async (_, payload, context) => {
  try {
    /*
            payload : {
                replyId : Int
            }
        */
    const { replyId } = payload
    const existingReply = await prisma.expReply.findFirst({
      where: {
        id: replyId,
      },
    })
    if (!existingReply) {
      throw new GraphQLError('Reply does not exist!!', {
        extensions: {
          code: 'REPLY_DOES_NOT_EXIST',
        },
      })
    }
    if (context.isUser) {
      const voteEntry = await prisma.userVotes.findFirst({
        where: {
          userId: context.userId,
          area: 'EXP_REPLY',
          areaId: replyId,
        },
      })
      if (voteEntry) {
        await prisma.userVotes.delete({ where: { id: voteEntry.id } })
        let likedReply = await prisma.expReply.update({
          where: {
            id: replyId,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        })
        likedReply = addUserName(likedReply)
        return likedReply
      }

      await prisma.userVotes.create({
        data: {
          userId: context.userId,
          area: 'EXP_REPLY',
          areaId: replyId,
          type: 'LIKE',
        },
      })

      let likedReply = await prisma.expReply.update({
        where: {
          id: replyId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      })
      likedReply = addUserName(likedReply)
      return likedReply
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
        error.extensions.code === 'REPLY_DOES_NOT_EXIST')
    ) {
      throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
