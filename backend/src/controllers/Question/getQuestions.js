import { prisma } from '../../../prisma/index.js'
import { addUserDetails } from '../../utils/addUserDetails.js'
import { filterData } from '../../utils/filteration.js'

export const getQuestions = async (_, payload) => {
  let questions = await prisma.question.findMany({
    where: payload.Question,
  })
  for (let i = 0; i < questions.length; i++) {
    questions[i] = await addUserDetails(questions[i], questions[i].createdBy)
  }
  questions = filterData(questions, payload.filter)
  return questions
}
