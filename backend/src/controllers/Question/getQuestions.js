import { prisma } from '../../../prisma/index.js'


export const getQuestions = async () => {
    console.log('GETTING ALL QUESTIONS')
    const questions = await prisma.question.findMany()
    console.log('ALL QUESTIONS FETCHED SUCCESSFULLY')
    return questions
  }