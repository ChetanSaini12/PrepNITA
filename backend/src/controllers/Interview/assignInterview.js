import { prisma } from '../../../prisma/index.js' 
import { GraphQLError } from 'graphql'

export const assignInterview = async (_, payload, context) => {
  try {
    if (context.isUser) {
      return await prisma.interview.update({
        where: { id: payload.interviewId },
        data: {
          interviewerId: context.userId,
        },
      })
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
      throw new GraphQLError('User not found!!', {
        extensions: {
          code: 'USER_NOT_FOUND',
        },
      })
    }
  }
}
