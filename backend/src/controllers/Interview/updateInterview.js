import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js'
import { abstractDateTime } from '../../utils/DateTime.js';
import sendEmail from '../../email/send.email.js';

export const updateInterview = async (_, payload, context) => {
  try {
    console.log('Hello from Update Interview');
    if (context.userId) {
      const exisitngInterview = await prisma.interview.findFirst({
        where: {
          id: payload.interviewId,
        },
      })

      if (exisitngInterview) {
        if (exisitngInterview.intervieweeId === context.userId) {
          var interview = await prisma.interview.update({
            where: {
              id: payload.interviewId,
            },
            data: {
              ...payload.Interview,
            },
            include: {
              feedback: true,
            },
          })
          interview = await interviewNameAdd(interview)
          // Date and Time from interview.startTime
          console.log('Updated Interview : ', interview);
          const dateTime = abstractDateTime(interview.startTime)
          const interviewDate = dateTime.date
          const interviewTime = dateTime.time
          const intervieweeMessageBody = {
            subject: 'Prep NITA : Interview Updated',
            template: './Interview/updateInterview',
            context: {
              recipientName: interview.intervieweeName,
              candidateName: interview.intervieweeName,
              interviewDate,
              interviewTime,
              interviewDuration: interview.duration,
              topics: interview.topics,
            },
          }
          console.log('IntervieweeMessageBody : ', intervieweeMessageBody);
          await sendEmail(interview.intervieweeEmail, intervieweeMessageBody)

          if (interview.interviewerName) {
            const interviewerMessageBody = {
              subject: 'Prep NITA : Interview Updated',
              template: './Interview/updateInterview',
              context: {
                recipientName: interview.interviewerName,
                interviewerName: interview.interviewerName,
                candidateName: interview.intervieweeName,
                interviewDate,
                interviewTime,
                interviewDuration: interview.duration,
                topics: interview.topics,
              },
            }
            await sendEmail(interview.interviewerEmail, interviewerMessageBody)
          }


          console.log('Updated Interview: ' + JSON.stringify(interview))
          return interview
        } else {
          throw new GraphQLError(
            "You can't update someone else's created interview!!",
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
      error.extensions(
        error.extensions.code === 'USER_IS_NOT_AUTHORISED' ||
          error.extensions.code === 'INTERVIEW_NOT_FOUND' ||
          error.extensions.code === 'INTERVIEW_IS_CREATED_BY_SOMEONE_ELSE'
      )
    ) {
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
