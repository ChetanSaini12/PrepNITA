import { prisma } from '../../../prisma/index.js'
import { addUserDetails } from '../../utils/addUserDetails.js'

export const getQuestions = async (_, payload) => {
  // payload : [string]
  const {tags} = payload
  let questions = await prisma.question.findMany({
    where: {
      tags: {
        hasEvery: tags, // Ensure the question has all tags
      },
    },
  });

  for (let i = 0; i < questions.length; i++) {
    questions[i] = await addUserDetails(questions[i], questions[i].createdBy)
  }
  return questions
}
