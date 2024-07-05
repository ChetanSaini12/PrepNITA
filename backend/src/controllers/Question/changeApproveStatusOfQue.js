import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js'
import { addUserDetails } from '../../utils/addUserDetails.js'

export const changeApproveStatusOfQue = async (_, payload, context) => {
  try {
    console.log(
      'Change Approve Status of Question with ID : ',
      payload.QuestionId
    )
    if (context.isAdmin) {
      const existingQuestion = await getQuestionByIdHelper(payload.QuestionId)

      const updatedIsApproved = !existingQuestion.isApproved

      let question = await prisma.question.update({
        where: { id: payload.QuestionId },
        data: { isApproved: updatedIsApproved },
      })

      console.log(
        `Approve Status Changed of Question with ID : ${payload.QuestionId} - ${updatedIsApproved}`
      )
      question = await addUserDetails(question, question.createdBy)
      return question
    }
    console.log(
      `Failed Approve Status Change of Question with ID : ${payload.QuestionId}`
    )
    throw new GraphQLError(
      'You are not an authorised admin for changing approve status of a question!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_ALTER_APPROVE_STATUS_QUESTION',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code ===
        'NOT_AUTHORISED_FOR_ALTER_APPROVE_STATUS_QUESTION'
    ) {
      throw error
    } else {
      throw new GraphQLError(
        'Error while changing approve status of question!!',
        {
          extensions: {
            code: 'CHANGE_APPROVE_STATUS_FAILED',
          },
        }
      )
    }
  }
}
