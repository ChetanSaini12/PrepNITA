import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const changeVisibleStatusOfQuiz = async (_, payload, context) => {
  /*
    payload : {
        quizId
    }
    // Admin or Quiz Owner can change
    */

  try {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: payload.quizId,
      },
    })
    if (quiz) {
      const currenVisibleStatus = quiz.isVisible
      const updatedVisibleStatus = !currenVisibleStatus
      const updatedQuiz = await prisma.quiz.update({
        where: {
          id: payload.quizId,
        },
        data: {
          isVisible: updatedVisibleStatus,
        },
      })
      console.log(
        `Updated Visible Status of Quiz with ID : ${payload.quizId} - ${updatedVisibleStatus}`
      )
      return updatedQuiz
    } else {
      throw new GraphQLError("Quiz with given quizId doesn't exist", {
        extensions: {
          code: 'QUIZ_NOT_FOUND',
        },
      })
    }
  } catch (error) {
    console.log('Error while updating visible status of quiz : ', error)
    if (error.extensions && error.extensions.code === 'QUIZ_NOT_FOUND') {
      throw error
    } else {
      throw new GraphQLError('Error while changing visible status of quiz!!', {
        extensions: {
          code: 'CHANGE_VISIBLE_STATUS_QUIZ_FAILED',
        },
      })
    }
  }
}
