import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const getQuizByIdHelper = async (id) => {
  const quiz = await prisma.quiz.findFirst({
    where: { id },
  })
  if (!quiz) {
    throw new GraphQLError('Quiz not found!!', {
      extensions: {
        code: 'NOT_FOUND',
      },
    })
  }
  return quiz
}
