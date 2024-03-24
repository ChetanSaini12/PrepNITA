import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js'

export const assignInterview = async (_, payload, context) => {
  try {
    console.log('PAYLOAD WHILE ASIGNING INTERVIEW : ', JSON.stringify(payload));
    if (context.isUser) {
      var interview = await prisma.interview.update({
        where: { id: payload.interviewId },
        data: {
          interviewerId: context.userId,
        },
        include: {
          feedback: true,
        },
      })

      interview = interviewNameAdd(interview)
      console.log('Assigned Interview : ', interview)
      return interview
    } else {
      throw new GraphQLError('User is not authorized!!', {
        extensions: {
          code: 'NOT_AUTHORIZED_FOR_INTERVIEW',
        },
      })
    }
  } catch (error) {
    console.log(error)
    if (error.code === 'NOT_AUTHORIZED_FOR_INTERVIEW') {
      throw error
    } else {
      throw new GraphQLError('Something Went Wrong', {
        extensions: {
          code: 'SOMETHING_WENT_WRONG',
        },
      })
    }
  }
}
