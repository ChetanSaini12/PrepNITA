import { prisma } from '../../../prisma/index.js'

export const getQuestions = async (_, payload) => {
  console.log('GETTING ALL QUESTIONS')
  const questions = await prisma.question.findMany({
    where: payload,
  })
  console.log('ALL QUESTIONS FETCHED SUCCESSFULLY')
  return questions
}
