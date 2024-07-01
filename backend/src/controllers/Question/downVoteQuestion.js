import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js'
import { addLikeStatus } from '../../utils/addLikeStatus.js'

export const downVoteQuestion = async (_, payload, context) => {
  try {
    console.log('DownVote Question with ID : ', payload.QuestionId)
    if (context.isUser) {
      const voteEntry = await prisma.userVotes.findFirst({
        where: {
          userId: context.userId,
          area: 'QUESTION',
          areaId: payload.QuestionId,
        },
      })

      if (voteEntry) {
        if (voteEntry.type === 'DISLIKE') {
          // delete voteEntry and decrement downvotes
          await prisma.userVotes.delete({ where: { id: voteEntry.id } })
          let updQuestion = await prisma.question.update({
            where: { id: payload.QuestionId },
            data: { downvotes: { decrement: 1 } },
          })
          console.log(
            'Successfully Disliked Count Decreased of Question with ID : ',
            payload.QuestionId
          )
          
        updQuestion = addLikeStatus(updQuestion, context.userId, 'QUESTION')
          return updQuestion
        } else {
          // Update vote entry type to DISLIKE, and increment downvotes and decrement upvotes
          await prisma.userVotes.update({
            where: { id: voteEntry.id },
            data: { type: 'DISLIKE' },
          })
          let updQuestion = await prisma.question.update({
            where: { id: payload.QuestionId },
            data: { downvotes: { increment: 1 }, upvotes: { decrement: 1 } },
          })
          console.log(
            'Successfully like count decreased and dislike count increased of Question with ID : ',
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
            type: 'DISLIKE',
          },
        })
        let updQuestion = await prisma.question.update({
          where: { id: payload.QuestionId },
          data: { downvotes: { increment: 1 } },
        })
        console.log(
          'Successfully Disliked Count Increased of Question with ID : ',
          payload.QuestionId
        )
        
        updQuestion = addLikeStatus(updQuestion, context.userId, 'QUESTION')
        return updQuestion
      }
    }

    console.log('Failed DownVote Question with ID : ', payload.QuestionId)
    throw new GraphQLError(
      'You are not an authorised User for downvoting a question!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_DOWNVOTE_QUESTION',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED_FOR_DOWNVOTE_QUESTION'
    ) {
      throw error
    } else {
      throw new GraphQLError('Error while downvoting question!!', {
        extensions: {
          code: 'DOWNVOTE_QUESTION_FAILED',
        },
      })
    }
  }
}
