import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addUserDetails } from '../../utils/addUserDetails.js';

export const getQuizByIdHelper = async (id) => {
  console.log('Getting quiz with id : ', id);
  let quiz = await prisma.quiz.findFirst({
    where: { id },
    include : {
      questions: true,
      attendees: true
    }
  })
  if (!quiz) {
    throw new GraphQLError('Quiz not found!!', {
      extensions: {
        code: 'NOT_FOUND',
      },
    })
  }
  quiz = await addUserDetails(quiz, quiz.createdBy)
  return quiz
}
