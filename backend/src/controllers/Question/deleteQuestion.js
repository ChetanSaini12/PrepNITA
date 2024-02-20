import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js';

export const deleteQuestion = async (_, payload, context) => {

    console.log(`DELETING QUESTION WITH ID : ${payload.QuestionId}`);
    
    // Admin can delete any question, a simple user can delete his/her own question only
    const question = await getQuestionByIdHelper(payload.QuestionId)
    
    if (context.isAdmin || context.userId === question.postedBy) {
      await prisma.queAddOnLink.deleteMany({
        where: { questionId: payload.QuestionId },
      })
      
      const question = await prisma.question.delete({
        where: { id: payload.QuestionId },
      })
      console.log(`DELETED QUESTION WITH ID : ${payload.QuestionId}`);
      return `DELETED QUESTION WITH TITLE : ${question.title}`
    }
    
    console.log(`FAILED DELETION OF QUESTION WITH ID : ${payload.QuestionId}`);
    throw new GraphQLError('You are not an authorised admin or if you are a user then you are not deleting your own question!!', {
      extensions: {
        code: 'NOT_AUTHORISED_FOR_DELETING_QUETION',
      },
    })
  }