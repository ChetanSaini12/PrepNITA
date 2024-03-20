import { prisma } from '../../../prisma/index.js'
import { interviewNameAdd } from './interviewNameHelper.js'

export const revokeInterview = async (_, payload, context) => {
  // SuperAdmin & the person who is assigned as the interviewer can revoke that interview
  try {
    const exisitngInterview = await prisma.interview.findFirst({
      where: {
        id: payload.interviewId,
      },
    })

    if (context.isSuperAdmin || context.userId === exisitngInterview.interviewerId) {
      var interview = prisma.interview.update({
        where: { id: payload.interviewId },
        data: {
          interviewerId: null,
        },
        include: {
          feedback: true,
        },
      })

      interview = interviewNameAdd(interview)

      console.log('Revoked Interviewer : ', interview)
      return interview
    } else {
      throw new GraphQLError(
        'You are not a super admin or this interview is not assigned to you!!',
        {
          extensions: {
            code: 'NOT_AUTHORISED',
          },
        }
      )
    }
  } catch (error) {
    if (
      error &&
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED'
    ) {
      throw error
    } else {
      throw new GraphQLError('Something went wrong!!', {
        extensions: {
          code: 'SOMETHING_WENT_WRONG',
        },
      })
    }
  }
}
