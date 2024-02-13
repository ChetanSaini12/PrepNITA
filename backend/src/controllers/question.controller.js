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
  throw new GraphQLError('You are not an authorised admin!!', {
    extensions: {
      code: 'NOT_AUTHORISED',
    },
  })
}

const getQuestions = async () => {
    const questions = await prisma.question.findMany();
    return questions
}

const upVoteQuestion = async (_, payload, context) => {
  if(context.user)
  {
    const question = await prisma.question.update({
      where: { id: payload.QuestionId },
      data: { upvotes: payload.upvotes + 1 },
    })
    return question
  }

  throw new GraphQLError('You are not an authorised User!!', {
    extensions: {
      code: 'NOT_AUTHORISED',
    },
  })
}

const downVoteQuestion = async (_, payload, context) => {
  if(context.user)
  {
    const question = await prisma.question.update({
      where: { id: payload.QuestionId },
      data: { downvotes: payload.downvotes + 1 },
    })
    return question
  }

  throw new GraphQLError('You are not an authorised User!!', {
    extensions: {
      code: 'NOT_AUTHORISED',
    },
  })
}

const changeApproveStatusOfQue = async (_, payload, context) => {
  if(context.admin)
  {
    const question = await prisma.question.update({
      where: { id: payload.QuestionId },
      data: { isApproved: { not: { equals: true } } },
    })
    return question
  }
  throw new GraphQLError('You are not an authorised admin!!', {
    extensions: {
      code: 'NOT_AUTHORISED',
    },
  })
}

const deleteQuestion = async (_, payload, context) => {
  // Admin can delete any question, a simple user can delete his/her own question only
  if(context.isAdmin || context.userId === payload.userId)
  {
    const question = await prisma.question.delete({
      where: { id: payload.QuestionId },
    })
    return question
  }

  throw new GraphQLError('You are not an authorised admin!!', {
    extensions: {
      code: 'NOT_AUTHORISED',
    },
  })  
}

const updateQuestion = async (_, payload, context) => {
  if(payload.userId === context.userId) {
    const question = await prisma.question.update({
      where: { id: payload.QuestionId },
      data: {
        title: payload.Question.title,
        description: payload.Question.description,
        answer: payload.Question.answer,
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

export { createQuestion, getQuestions, upVoteQuestion, downVoteQuestion, changeApproveStatusOfQue, deleteQuestion, updateQuestion } 
