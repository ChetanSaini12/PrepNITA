import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const deleteQuizQuestion = async (_, payload, context) => {
  /*
    payload : {
        questionId;
    }
    */
  try {
    const question = await prisma.quizQuestion.findFirst({
      where: { id: payload.questionId },
    })
    console.log('QUESTION TO BE DELETED : ', JSON.stringify(question));
    if (question) {
        const quiz = await prisma.quiz.findFirst({
            where: { id: question.quizId },
        })
        console.log('QUIZ WHICH QUESTION IS TO BE DELETED : ', JSON.stringify(quiz));
      if (context.userId === quiz.createdBy) {
        await prisma.quizQuestion.delete({
          where: { id: payload.questionId },
        })
        console.log(`DELETED QUESTION WITH ID : ${payload.questionId}`)
        return `DELETED QUESTION WITH ID : ${payload.questionId}`
      } else {
        throw new GraphQLError(
          'User is not allowed to delete question which is not created by him!!',
          {
            extensions: {
              code: 'USER_IS_NOT_ALLOWED_TO_DELETE_QUESTION',
            },
          }
        )
      }
    } else {
      throw new GraphQLError(
        "Question with given Id doesn't exist in quiz question data",
        {
          extensions: {
            code: "QUESTION_DOESN'T EXIST",
          },
        }
      )
    }
  } catch (error) {
    console.log(error)
    if (
      (error.extensions &&
        error.extensions.code === 'USER_IS_NOT_ALLOWED_TO_DELETE_QUESTION') ||
      error.extensions.code === "QUESTION_DOESN'T EXIST"
    ) {
      throw error
    } else {
      throw new GraphQLError('Something went wrong!!', {
        extensions: {
          code: 'SOMETHING_WENT_WRONG!!',
        },
      })
    }
  }
}
