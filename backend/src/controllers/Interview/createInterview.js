import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const createInterview = async (_, payload, context) => {
  try {
    if (context.isUser) {
      const interview = await prisma.interview.create({
        data: {
          interviewerId: context.userId,
          startTime: payload.interview.startTime,
          duration: payload.interview.duration,
          topics: payload.interview.topics,
        },
      })
      console.log('INTERVIEW CREATED : ', interview)
      return interview
    } else {
      throw new GraphQLError('User is not authorized!!', {
        extensions: {
          code: 'NOT_AUTHORIZED_FOR_INTERVIEW',
        },
      })
    }
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORIZED_FOR_INTERVIEW'
    ) {
      throw error
    } else {
      throw new GraphQLError('Error while creating interview!!', {
        extensions: {
          code: 'CREATE_INTERVIEW_FAILED',
        },
      })
    }
  }
}
