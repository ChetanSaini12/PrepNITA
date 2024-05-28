import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'
export const addQuestionsToQuiz = async (_, payload, context) => {
  /*
    payload : {
        question : {
            quizId,
            description
            options
            correctOption
        }
    }
    */
  try {
    console.log('DATA FOR ADDING QUESTION : ', JSON.stringify(payload))
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: payload.question.quizId,
      },
    })
    if (!quiz) {
      throw new GraphQLError("Quiz Donesn't Exist!!", {
        extensions: { code: "QUIZ_DOESN'T EXIST" },
      })
    } else if (quiz.createdBy === context.userId) {
      console.log('Same User for adding Question')
      const question = await prisma.quizQuestion.create({
        data: {
          ...payload.question,
        },
      })

      console.log('Question Created : ', JSON.stringify(question))
      return question
    } else {
      throw new GraphQLError(
        'User is allowed to add questions to only that quiz which is created by him!!',
        {
          extensions: {
            code: 'USER_IS_NOT_ALLOWED_TO_ADD_QUESTIONS_IN_OTHERS_QUIZ',
          },
        }
      )
    }
  } catch (error) {
    console.log('ERROR WHILE ADDIN QUESTION : ', error)
    if (
      (error.extensions &&
        error.extensions.code ===
          'USER_IS_NOT_ALLOWED_TO_ADD_QUESTIONS_IN_OTHERS_QUIZ') ||
      error.extensions.code === "QUIZ_DOESN'T EXIST"
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
