import { prisma } from '../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { addUserDetails } from '../../utils/addUserDetails.js'
import { filterData } from '../../utils/filteration.js'

export const getAllQuiz = async (_, payload) => {
  try {
    let quizes = await prisma.quiz.findMany({ where: payload })
    for (let i = 0; i < quizes.length; i++) {
      quizes[i] = await addUserDetails(quizes[i], quizes[i].createdBy)
    }
    quizes = filterData(quizes, payload.filter)
    return quizes
  } catch (error) {
    // CHNG
    console.log('ERROR WHILE FETCHING ALL QUIZES : ', error)
    // CHNG
    throw new GraphQLError('Error while fetching quizes', {
      extensions: {
        code: 'FETCH_QUIZ_FAILED',
      },
    })
  }
}
