import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js'
import { addLikeStatus } from '../../utils/addLikeStatus.js'

export const upVoteQuestion = async (_, payload, context) => {
  try {
    console.log('UpVote Question with ID : ', payload.QuestionId)
    if (context.isUser) {
      const voteEntry = await prisma.userVotes.findFirst({
        where: {
          userId: context.userId,
          area: 'QUESTION',
          areaId: payload.QuestionId,
        },
      })

      if (voteEntry) {
        if (voteEntry.type === 'LIKE') {
          // Delte voteEntry, and decrement upvotes
          await prisma.userVotes.delete({ where: { id: voteEntry.id } })
          let updQuestion = await prisma.question.update({
            where: { id: payload.QuestionId },
            data: { upvotes: { decrement: 1 } },
          })
          console.log(
            'Successfully Liked Count Decreased of Question with ID : ',
            payload.QuestionId
          )

          updQuestion = addLikeStatus(updQuestion, context.userId, 'QUESTION')
          return updQuestion
        } else {
          // Update vote entry type to LIKE, and increment upvotes and decrement downvotes
          await prisma.userVotes.update({
            where: { id: voteEntry.id },
            data: { type: 'LIKE' },
          })
          let updQuestion = await prisma.question.update({
            where: { id: payload.QuestionId },
            data: { upvotes: { increment: 1 }, downvotes: { decrement: 1 } },
          })
          console.log(
            'Successfully dislike count decreased and like count increased of Question with ID : ',
            payload.QuestionId
          )

          updQuestion = addLikeStatus(updQuestion, context.userId, 'QUESTION')
          return updQuestion
        }
      } else {
        await prisma.userVotes.create({
          data: {
            userId: context.userId,
            area: 'QUESTION',
            areaId: payload.QuestionId,
            type: 'LIKE',
          },
        })
        let updQuestion = await prisma.question.update({
          where: { id: payload.QuestionId },
          data: { upvotes: { increment: 1 } },
        })
        console.log(
          'Successfully Liked Count Increased of Question with ID : ',
          payload.QuestionId
        )

        updQuestion = addLikeStatus(updQuestion, context.userId, 'QUESTION')
        return updQuestion
      }
    }

    console.log('Failed UpVote Question with ID : ', payload.QuestionId)
    throw new GraphQLError(
      'You are not an authorised User for upvoting a question!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_UPVOTE_QUESTION',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED_FOR_UPVOTE_QUESTION'
    ) {
      throw error
    } else {
      console.log('ERROR : ', error)
      throw new GraphQLError('Error while upvoting question!!', {
        extensions: {
          code: 'UPVOTE_QUESTION_FAILED',
        },
      })
    }
  }
}
