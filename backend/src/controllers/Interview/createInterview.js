import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { interviewNameAdd } from './interviewNameHelper.js'

export const createInterview = async (_, payload, context) => {
  try {
    console.log('PAYLAOD : ', JSON.stringify(payload.Interview))
    if (context.isUser) {
      var interview = await prisma.interview.create({
        data: {
          intervieweeId: context.userId,
          startTime: payload.Interview.startTime,
          duration: payload.Interview.duration,
          topics: payload.Interview.topics,
          feedback : { create : {}}
        },
        include: {
          feedback: true,
        },
      })
      interview = interviewNameAdd(interview)

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
      console.log('ERROR ', error)
      throw new GraphQLError('Error while creating interview!!', {
        extensions: {
          code: 'CREATE_INTERVIEW_FAILED',
        },
      })
    }
  }
}
