import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js'

export const upVoteQuestion = async (_, payload, context) => {
  try {
    console.log('UpVote Question with ID : ', payload.QuestionId)
    if (context.isUser) {
      await getQuestionByIdHelper(payload.QuestionId)
      const updQuestion = await prisma.question.update({
        where: { id: payload.QuestionId },
        data: { upvotes: { increment: 1 } },
      })
      console.log(
        'Successfully UpVoted Question with ID : ',
        payload.QuestionId
      )
      return updQuestion
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
      throw new GraphQLError('Error while upvoting question!!', {
        extensions: {
          code: 'UPVOTE_QUESTION_FAILED',
        },
      })
    }
  }
}
