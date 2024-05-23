import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js'
import { abstractDateTime } from '../../utils/DateTime.js';
import sendEmail from '../../email/send.email.js';

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

      interview = await interviewNameAdd(interview)
      console.log('Assigned Interview : ', JSON.stringify(interview))


      // Date and Time from interview.startTime
      const dateTime = abstractDateTime(interview.startTime);
      const interviewDate = dateTime.date
      const interviewTime = dateTime.time
      // Send Email to both 
      const intervieweeMessageBody = {
        subject: 'PrepNITA : Interview Assignment',
        template: './Interview/assignInterview_interviewee',
        context: {
          intervieweeName : interview.intervieweeName,
          interviewerName : interview.interviewerName,
          interviewerEmail : interview.interviewerEmail,
          interviewDate,
          interviewTime,
          interviewDuration : interview.duration,
          topics: interview.topics,
        }, 
      }
      const interviewerMessageBody = {
        subject: 'PrepNITA : Interview Assignment',
        template: './Interview/assignInterview_interviewer',
        context: {
          interviewerName : interview.interviewerName,
          intervieweeName : interview.intervieweeName,
          intervieweeEmail : interview.intervieweeEmail,
          interviewDate,
          interviewTime,
          interviewDuration : interview.duration,
          topics: interview.topics,
        },
      }

      if(interview.intervieweeEmail) await sendEmail(interview.intervieweeEmail, intervieweeMessageBody)
      if(interview.interviewerEmail) await sendEmail(interview.interviewerEmail, interviewerMessageBody)
        console.log('Email Sent Successfully');
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
