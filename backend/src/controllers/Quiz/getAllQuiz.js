import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'

export const getAllQuiz = async (_, payload) => {
  try {
    const quizes = await prisma.quiz.findMany({ where: payload })
    return quizes
  } catch (error) {
    // CHNG
    console.log('ERROR WHILE FETCHING ALL QUIZES : ', error);
    // CHNG
    throw new GraphQLError('Error while fetching quizes', {
        extensions : {
            code : 'FETCH_QUIZ_FAILED'
        }
    })
  }
}
