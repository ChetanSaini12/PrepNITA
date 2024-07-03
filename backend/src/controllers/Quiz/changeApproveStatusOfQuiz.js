import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuizByIdHelper } from './getQuizByIdHelper.js'
import { addUserDetails } from '../../utils/addUserDetails.js'

export const changeApproveStatusOfQuiz = async (_, payload, context) => {
  try {
    console.log('Change Approve Status of Quiz with ID : ', payload.quizId)
    if (context.isAdmin) {
      const existingQuiz = await getQuizByIdHelper(payload.quizId)
      const updatedIsApproved = !existingQuiz.isApproved
      let quiz = await prisma.quiz.update({
        where: { id: payload.quizId },
        data: { isApproved: updatedIsApproved },
      })
      console.log(
        `Approve Status Changed of Quiz with ID : ${payload.quizId} - ${updatedIsApproved}`
      )
      console.log("APPROVED QUIZ : ", JSON.stringify(quiz));
      quiz = await addUserDetails(quiz, quiz.createdBy)
      return quiz
    }
    console.log(
      `Failed Approve Status Change of Quiz with ID : ${payload.quizId}`
    )
    throw new GraphQLError(
      'You are not an authorised admin for changing approve status of a quiz!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_ALTER_APPROVE_STATUS_QUIZ',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED_FOR_ALTER_APPROVE_STATUS_QUIZ'
    ) {
      throw error
    } else {
      console.log("Quiz Approve Status Change Failed : " , error);
      throw new GraphQLError(
        'Error while changing approve status of quiz!!',
        {
          extensions: {
            code: 'CHANGE_APPROVE_STATUS_FAILED',
          },
        }
      )
    }
  }
}
