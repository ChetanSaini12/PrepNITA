import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuizByIdHelper } from './getQuizByIdHelper.js'
export const deleteQuiz = async (_, payload, context) => {
  try {
    console.log(`DELETING QUIZ WITH ID : ${payload.QuizId}`)

    // Admin can delete any Quiz, a simple user can delete his/her own Quiz only
    const Quiz = await getQuizByIdHelper(payload.QuizId)

    if (context.isAdmin || context.userId === Quiz.postedBy) {
      await prisma.quizQuestion.deleteMany({
        where: { quizId: payload.QuizId },
      })
      await prisma.quizAttendance.deleteMany({
        where: { quizId: payload.QuizId },
      })

      const Quiz = await prisma.quiz.delete({
        where: { id: payload.QuizId },
      })
      console.log(`DELETED QUIZ WITH ID : ${payload.QuizId}`)
      return `DELETED QUIZ WITH ID : ${Quiz.id}`
    }

    console.log(`FAILED DELETION OF QUIZ WITH ID : ${payload.QuizId}`)
    throw new GraphQLError(
      'You are not an authorised admin or if you are a user then you are not deleting your own Quiz!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_DELETING_QUIZ',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED_FOR_DELETING_QUIZ'
    ) {
      throw error
    } else {
      throw new GraphQLError('Error while deleting Quiz!!', {
        extensions: {
          code: 'DELETE_QUIZ_FAILED',
        },
      })
    }
  }
}
