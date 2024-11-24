import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { interviewNameAdd } from './interviewNameHelper.js'
import { v4 as uuidv4 } from 'uuid'

export const createInterview = async (_, payload, context) => {
  try {
    console.log('PAYLAOD : ', JSON.stringify(payload.Interview))
    if (context.isUser) {
      const roomId = uuidv4()

      var interview = await prisma.interview.create({
        data: {
          intervieweeId: context.userId,
          startTime: payload.Interview.startTime,
          duration: payload.Interview.duration,
          topics: payload.Interview.topics,
          roomId,
          feedback: { create: {} },
        },
        include: {
          feedback: true,
        },
      })
      interview = await interviewNameAdd(interview)

      console.log('INTERVIEW CREATED : ', JSON.stringify(interview))
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
