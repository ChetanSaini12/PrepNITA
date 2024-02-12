import { GraphQLError } from 'graphql'
import { prisma } from '../../prisma/index.js'

const createQuestion = async (_, payload, context) => {
  console.log('CREATING QUESTION : ', payload)
  console.log('Context while creating Question : ', context)
  if (context.isAdmin) {
    const question = await prisma.question.create({
      data: {
        title: payload.Question.title,
        description: payload.Question.description,
        answer: payload.Question.answer,
        postedBy: context.userId,
        tags: payload.Question.tags,
        links: {create : payload.Question.links}
      },
    })

    return question
  }
  throw new GraphQLError('You are not an authorised user!!', {
    extensions: {
      code: 'NOT_AUTHORISED',
    },
  })
}

const getQuestions = async () => {
    const questions = await prisma.question.findMany();
    return questions
}

export { createQuestion, getQuestions } 
