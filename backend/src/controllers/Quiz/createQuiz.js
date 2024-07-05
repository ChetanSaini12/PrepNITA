import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addUserDetails } from '../../utils/addUserDetails.js'

export const createQuiz = async (_, payload, context) => {
  try {
    console.log('CREATING QUIZ : ', payload)
    if (context.isUser) {
      let quiz = await prisma.quiz.create({
        data: {
          title: payload.Quiz.title,
          description: payload.Quiz.description,
          startTime: payload.Quiz.startTime,
          endTime: payload.Quiz.endTime,
          createdBy: context.userId,
        },
      })
      console.log('QUIZ CREATED : ', quiz)
      quiz = await addUserDetails(quiz, quiz.createdBy)
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
      console.log("ERROR WHILE CREATING QUIZ : ", error );
      throw error
    } else {
      console.log("ERROR WHILE CREATING QUIZ : ", error );
      throw new GraphQLError('Error while creating quiz!!', {
        extensions: {
          code: 'CREATE_QUIZ_FAILED',
        },
      })
    }
  }
}
