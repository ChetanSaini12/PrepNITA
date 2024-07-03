import { prisma } from '../../../prisma/index.js'
import { addUserDetails } from '../../utils/addUserDetails.js'

export const getQuestions = async (_, payload) => {
  console.log('GETTING ALL QUESTIONS')
  let questions = await prisma.question.findMany({
    where: payload,
  })
  console.log('ALL QUESTIONS FETCHED SUCCESSFULLY')
  for (let i = 0; i < questions.length; i++) {
    questions[i] = await addUserDetails(questions[i], questions[i].createdBy)
  }
  return questions
}
