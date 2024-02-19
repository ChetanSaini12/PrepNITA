import { GraphQLError } from 'graphql'
import { prisma } from '../../prisma/index.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js';

export const downVoteQuestion = async (_, payload, context) => {
    console.log('DownVote Question with ID : ', payload.QuestionId);
    if (context.isUser) {
      await getQuestionByIdHelper(payload.QuestionId)
      const updQuestion = await prisma.question.update({
        where: { id: payload.QuestionId },
        data: { downvotes: { increment: 1 } },
      })
      console.log('Successfully DownVoted Question with ID : ', payload.QuestionId);
      return updQuestion
    }
    
    console.log('Failed DownVote Question with ID : ', payload.QuestionId);
    throw new GraphQLError('You are not an authorised User for downvoting a question!!', {
      extensions: {
        code: 'NOT_AUTHORISED_FOR_DOWNVOTE_QUESTION',
      },
    })
  }