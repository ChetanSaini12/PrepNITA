import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js'
import { abstractDateTime } from '../../utils/DateTime.js'
import sendEmail from '../../email/send.email.js'

export const deleteInterview = async (_, payload, context) => {
  try {
    if (context.userId) {
      var interview = await prisma.interview.findFirst({
        where: {
          id: payload.interviewId,
        },
      })

      if (interview) {
        if (interview.intervieweeId === context.userId) {
          interview = await interviewNameAdd(interview)
          console.log('Intervieww : ', interview)
          await prisma.feedback.deleteMany({
            where: {
              interviewId: payload.interviewId,
            },
          })
          await prisma.interview.delete({
            where: {
              id: payload.interviewId,
            },
          })

          console.log('Interviewwww : ', interview)
          const dateTime = abstractDateTime(interview.startTime)
          const interviewDate = dateTime.date
          const interviewTime = dateTime.time
          console.log(dateTime)
          var messageBody = {
            subject: 'Prep NITA : Interview Cancelled',
            template: './Interview/deleteInterview',
            context: {
              recipientName: interview.intervieweeName,
              interviewerName: interview.interviewerName,
              candidateName: interview.intervieweeName,
              interviewDate,
              interviewTime,
            },
          }
          console.log('messageBody : ', messageBody)
          await sendEmail(interview.intervieweeEmail, messageBody)

          if (interview.interviewerEmail) {
            messageBody.context.recipientName = interview.interviewerName
            await sendEmail(interview.interviewerEmail, messageBody)
          }
          return `DELETED INTERVIEW WITH ID : ${interview.id}`
        } else {
          throw new GraphQLError(
            "You can't delete someone else's created interview!!",
            {
              extensions: {
                code: 'INTERVIEW_IS_CREATED_BY_SOMEONE_ELSE',
              },
            }
          )
        }
      } else {
        throw new GraphQLError('No interview with given id', {
          extensions: {
            code: 'INTERVIEW_NOT_FOUND',
          },
        })
      }
    } else {
      throw new GraphQLError('User is not authorised!!', {
        extensions: {
          code: 'USER_IS_NOT_AUTHORISED',
        },
      })
    }
  } catch (error) {
    if (
      error &&
      error.extensions &&
      (error.extensions.code === 'USER_IS_NOT_AUTHORISED' ||
        error.extensions.code === 'INTERVIEW_NOT_FOUND' ||
        error.extensions.code === 'INTERVIEW_IS_CREATED_BY_SOMEONE_ELSE')
    ) {
      throw error
    } else {
      console.log('ERORR : ', error)
      throw new GraphQLError('Something went wrong!!', {
        extensions: {
          code: 'SOMETHING_WENT_WRONG!!',
        },
      })
    }
  }
}
