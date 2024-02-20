import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const createQuestion = async (_, payload, context) => {
    console.log('CREATING QUESTION : ', payload)
    if (context.isUser) {
      const question = await prisma.question.create({
        data: {
          title: payload.Question.title,
          description: payload.Question.description,
          answer: payload.Question.answer,
          postedBy: context.userId,
          tags: payload.Question.tags,
          links: { create: payload.Question.links },
        },
      })
      console.log('QUESTION CREATED : ', question)
      return question
    }
    console.log('QUESTION CREATION FAILED!!')
    throw new GraphQLError(
      'You are not an authorised user to create a question!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_QUESTION_CREATION',
        },
      }
    )
  }
  