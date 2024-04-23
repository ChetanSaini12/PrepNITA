import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const createQuiz = async (_, payload, context) => {
  try {
    console.log('CREATING QUIZ : ', payload)
    if (context.isUser) {
      const quiz = await prisma.quiz.create({
        data: {
          title: payload.Quiz.title,
          description: payload.Quiz.description,
          startTime: payload.Quiz.startTime,
          endTime: payload.Quiz.endTime,
          // QUIZs: { create: payload.Quiz.QUIZs },
          createdBy: context.userId,
        },
      })
      console.log('QUIZ CREATED : ', quiz)
      return quiz
    }
    console.log('Quiz CREATION FAILED!!')
    throw new GraphQLError(
      'You are not an authorised user to create a quiz!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_QUIZ_CREATION',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED_FOR_QUIZ'
    ) {
      throw error
    } else {
      throw new GraphQLError('Error while creating quiz!!', {
        extensions: {
          code: 'CREATE_QUIZ_FAILED',
        },
      })
    }
  }
}
