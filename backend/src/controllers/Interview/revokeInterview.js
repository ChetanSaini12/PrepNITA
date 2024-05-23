import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import sendEmail from '../../email/send.email.js'
import { abstractDateTime } from '../../utils/DateTime.js'
import { interviewNameAdd } from './interviewNameHelper.js'

export const revokeInterview = async (_, payload, context) => {
  // SuperAdmin & the person who is assigned as the interviewer can revoke that interview
  try {
    const exisitngInterview = await prisma.interview.findFirst({
      where: {
        id: payload.interviewId,
      },
    })
    console.log('Existing interviewer : ', JSON.stringify(exisitngInterview))
    if (
      context.isSuperAdmin ||
      context.userId === exisitngInterview.interviewerId
    ) {
      var interview = await prisma.interview.findFirst({
        where: { id: payload.interviewId },
        include: {
          feedback: true,
        },
      })

      await prisma.interview.update({
        where: { id: payload.interviewId },
        data: {
          interviewerId: null,
        },
        include: {
          feedback: true,
        },
      })

      // console.log('PHLE WALA : ', );
      interview = await interviewNameAdd(interview)
      const dateTime = abstractDateTime(interview.startTime)
      const interviewDate = dateTime.date
      const interviewTime = dateTime.time
      const messageBody = {
        subject: 'PrepNITA : Interview Revoked',
        template: './Interview/revokeInterview',
        context: {
          interviewerName: interview.interviewerName,
          candidateName: interview.intervieweeName,
          interviewDate,
          interviewTime,
        },
      }
      console.log('Revoked Interviewer : ', interview)
      await sendEmail(interview.intervieweeEmail, messageBody)
      console.log('Email Sent Successfully!!')
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
