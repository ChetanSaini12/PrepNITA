import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js';
import sendEmail from '../../email/send.email.js';

export const giveFeedback = async (_, payload, context) => {
  console.log('PAYYLLOOADD : ', JSON.stringify(payload.Feedback));
  try {
    if (context.userId) {
      const feedback = await prisma.feedback.update({
        where : { interviewId : payload.Feedback.interviewId},
        data: {
          communication : payload.Feedback.communication,
          dsa : payload.Feedback.dsa,
          development : payload.Feedback.development,
          csfundamentals : payload.Feedback.csfundamentals,
          notes : payload.Feedback.notes,
          points : payload.Feedback.communication + payload.Feedback.dsa + payload.Feedback.development + payload.Feedback.csfundamentals
        },
      })
      var interview = await prisma.interview.findFirst({
        where : {
          id : payload.Feedback.interviewId
        }
      })
      console.log('IINNTTEERR : ', interview);
      interview = await interviewNameAdd(interview)
      console.log('IINNTTEERRVVIIEEWW : ', interview);

      const messageBody = {
        subject : 'Prep NITA : Feedback Update',
        template : './Interview/feedbackInterview',
        context : {
          candidateName : interview.intervieweeName,
          interviewerName : interview.interviewerName 
        }
      }

      await sendEmail(interview.intervieweeEmail, messageBody)
      return feedback
    } else {
      throw new GraphQLError('You are not authorised!!', {
        extensions: {
          code: 'USER_IS_NOT_AUTHORISED!!',
        },
      })
    }
  } catch (error) {
    if (error && error.extensions.code === 'USER_IS_NOT_AUTHORISED!!') {
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
