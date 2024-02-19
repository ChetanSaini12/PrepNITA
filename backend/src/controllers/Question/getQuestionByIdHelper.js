import { GraphQLError } from 'graphql'
import { prisma } from '../../prisma/index.js'

export const getQuestionByIdHelper = async (id) => {
    const question = await prisma.question.findFirst({
      where: { id },
    })
    if (!question) {
      throw new GraphQLError('Question not found!!', {
        extensions: {
          code: 'NOT_FOUND',
        },
      })
    }
    return question
  }