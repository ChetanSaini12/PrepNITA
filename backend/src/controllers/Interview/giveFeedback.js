import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'

export const giveFeedback = async (_, payload, context) => {
  try {
    if (context.userId) {
      const feedback = await prisma.feedback.update({
        where : { interviewId : payload.interviewId},
        data: {
          communication : payload.communication,
          dsa : payload.dsa,
          development : payload.development,
          csfundamentals : payload.csfundamentals,
          notes : payload.notes,
          points : payload.communication + payload.dsa + payload.development + payload.csfundamentals
        },
      })
      return feedback
    } else {
      throw new GraphQLError('You are not authorised!!', {
        extensions: {
          code: 'USER_IS_NOT_AUTHORISED!!',
        },
      })
    }
  } catch (error) {
    if (error && error.extensions.code === 'USER_IS_NOT_AUTHORISED') {
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
