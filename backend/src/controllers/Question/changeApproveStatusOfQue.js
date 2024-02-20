import { GraphQLError } from 'graphql'
import { prisma } from '../../prisma/index.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js';

export const changeApproveStatusOfQue = async (_, payload, context) => {
    console.log("Change Approve Status of Question with ID : ", payload.QuestionId);
    if (context.isAdmin) {
      const existingQuestion = await getQuestionByIdHelper(payload.QuestionId)
      
      const updatedIsApproved = !existingQuestion.isApproved
      
      const question = await prisma.question.update({
        where: { id: payload.QuestionId },
        data: { isApproved: updatedIsApproved },
      })
      
      console.log(`Approve Status Changed of Question with ID : ${payload.QuestionId} - ${updatedIsApproved}`);
      return question
    }
    console.log(`Failed Approve Status Change of Question with ID : ${payload.QuestionId}`);
    throw new GraphQLError('You are not an authorised admin for changing approve status of a question!!', {
      extensions: {
        code: 'NOT_AUTHORISED_FOR_ALTER_APPROVE_STATUS_QUESTION',
      },
    })
  }
  