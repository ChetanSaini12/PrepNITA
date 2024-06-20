import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

const calculateScore = (quiz, response) => {
  let score = 0
  if (response.length !== quiz.questions.length) {
    throw new Error('Number of response does not match the number of questions')
  }

  for (let i = 0; i < quiz.questions.length; i++) {
    const question = quiz.questions[i]
    const resp = response[i]

    if (resp === question.correctOption) {
      score += 10
    } else {
      score -= 2
    }
  }

  return score
}

export const setResponse = async (_, payload, context) => {
  try {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: payload.quizId,
      },
      include: {
        questions: true,
      },
    })

    if (quiz) {
      let score = calculateScore(quiz, payload.response)
      let quizAttendanceRecord = await prisma.quizAttendance.findFirst({
        where: {
          userId: context.userId,
          quizId: payload.quizId,
        },
      })

      // If the record doesn't exist, create it
      if (!quizAttendanceRecord) {
        quizAttendanceRecord = await prisma.quizAttendance.create({
          data: {
            userId: context.userId,
            quizId: payload.quizId,
            response: [],
            score: 0,
          },
        })
      }

      // Update the record
      const updatesQuizAttendModel = await prisma.quizAttendance.update({
        where: {
          id: quizAttendanceRecord.id,
        },
        data: {
          response: payload.response,
          score,
        },
      })
      return updatesQuizAttendModel
    } else {
      throw new GraphQLError('Quiz not found!!')
    }
  } catch (error) {
    throw new GraphQLError(error)
  }
}
