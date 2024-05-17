import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuizByIdHelper } from './getQuizByIdHelper.js'

export const updateQuiz = async (_, payload, context) => {
  try {
    console.log(`UPDATING QUIZ WITH ID : ${payload.quizId}`)
    const quiz = await getQuizByIdHelper(payload.quizId)

    if (quiz.createdBy === context.userId) {
      const quiz = await prisma.quiz.update({
        where: { id: payload.quizId },
        data: {
          title: payload.Quiz.title,
          description: payload.Quiz.description,
          startTime: payload.Quiz.startTime,
          endTime: payload.Quiz.endTime,
        },
      })
      console.log(`UPDATED QUIZ WITH ID : ${payload.quizId}`)
      return quiz
    }

    console.log(`FAILED UPDATING QUIZ WITH ID : ${payload.quizId}`)

    throw new GraphQLError('You can update only your quizes!!', {
      extensions: {
        code: 'NOT_AUTHORISED_FOR_UPDATING_QUIZ',
      },
    })
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED_FOR_UPDATING_QUIZ'
    ) {
      throw error
    } else {
      console.log('ERROR WHILE UPDATING QUIZ : ', error);
      throw new GraphQLError('Error while updating quiz!!', {
        extensions: {
          code: 'UPDATE_QUIZ_FAILED',
        },
      })
    }
  }
}
