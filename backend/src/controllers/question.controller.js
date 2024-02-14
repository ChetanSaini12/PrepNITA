import { GraphQLError } from 'graphql'
import { prisma } from '../../prisma/index.js'

const createQuestion = async (_, payload, context) => {
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

const getQuestions = async () => {
  console.log('GETTING ALL QUESTIONS')
  const questions = await prisma.question.findMany()
  console.log('ALL QUESTIONS FETCHED SUCCESSFULLY')
  return questions
}

const getQuestionByIdHelper = async (id) => {
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

const getQuestionById = async (_, payload, context) => {
  console.log('GETTING QUESTION BY ID : ', payload.QuestionId)
  const question = await getQuestionByIdHelper(payload.QuestionId)
  console.log(`GOT QUESTION WITH ID : ${payload.QuestionId} = ${question}`)
  return question
}

const upVoteQuestion = async (_, payload, context) => {
  console.log('UpVote Question with ID : ', payload.QuestionId);
  if (context.isUser) {
    await getQuestionByIdHelper(payload.QuestionId)
    const updQuestion = await prisma.question.update({
      where: { id: payload.QuestionId },
      data: { upvotes: { increment: 1 } },
    })
    console.log('Successfully UpVoted Question with ID : ', payload.QuestionId);
    return updQuestion
  }
  
  console.log('Failed UpVote Question with ID : ', payload.QuestionId);
  throw new GraphQLError('You are not an authorised User for upvoting a question!!', {
    extensions: {
      code: 'NOT_AUTHORISED_FOR_UPVOTE_QUESTION',
    },
  })
}

const downVoteQuestion = async (_, payload, context) => {
  console.log('DownVote Question with ID : ', payload.QuestionId);
  if (context.isUser) {
    await getQuestionByIdHelper(payload.QuestionId)
    const updQuestion = await prisma.question.update({
      where: { id: payload.QuestionId },
      data: { downvotes: { increment: 1 } },
    })
    console.log('Successfully DownVoted Question with ID : ', payload.QuestionId);
    return updQuestion
  }
  
  console.log('Failed DownVote Question with ID : ', payload.QuestionId);
  throw new GraphQLError('You are not an authorised User for downvoting a question!!', {
    extensions: {
      code: 'NOT_AUTHORISED_FOR_DOWNVOTE_QUESTION',
    },
  })
}

const changeApproveStatusOfQue = async (_, payload, context) => {
  console.log("Change Approve Status of Question with ID : ", payload.QuestionId);
  if (context.isAdmin) {
    const existingQuestion = await getQuestionByIdHelper(payload.QuestionId)
    
    const updatedIsApproved = !existingQuestion.isApproved
    
    const question = await prisma.question.update({
      where: { id: payload.QuestionId },
      data: { isApproved: updatedIsApproved },
    })
    
    console.log(`Approve Status Changed of Question with ID : ${payload.QuestionId} - ${updatedIsApproved}`);
    return question
  }
  console.log(`Failed Approve Status Change of Question with ID : ${payload.QuestionId}`);
  throw new GraphQLError('You are not an authorised admin for changing approve status of a question!!', {
    extensions: {
      code: 'NOT_AUTHORISED_FOR_ALTER_APPROVE_STATUS_QUESTION',
    },
  })
}

const deleteQuestion = async (_, payload, context) => {

  console.log(`DELETING QUESTION WITH ID : ${payload.QuestionId}`);
  
  // Admin can delete any question, a simple user can delete his/her own question only
  const question = await getQuestionByIdHelper(payload.QuestionId)
  
  if (context.isAdmin || context.userId === question.postedBy) {
    await prisma.queAddOnLink.deleteMany({
      where: { questionId: payload.QuestionId },
    })
    
    const question = await prisma.question.delete({
      where: { id: payload.QuestionId },
    })
    console.log(`DELETED QUESTION WITH ID : ${payload.QuestionId}`);
    return `DELETED QUESTION WITH TITLE : ${question.title}`
  }
  
  console.log(`FAILED DELETION OF QUESTION WITH ID : ${payload.QuestionId}`);
  throw new GraphQLError('You are not an authorised admin or if you are a user then you are not deleting your own question!!', {
    extensions: {
      code: 'NOT_AUTHORISED_FOR_DELETING_QUETION',
    },
  })
}

const updateQuestion = async (_, payload, context) => {

  console.log(`UPDATING QUESTION WITH ID : ${payload.QuestionId}`);

  const question = await getQuestionByIdHelper(payload.QuestionId)

  if (question.postedBy === context.userId) {
    const question = await prisma.question.update({
      where: { id: payload.QuestionId },
      data: {
        title: payload.Question.title,
        description: payload.Question.description,
        answer: payload.Question.answer,
        tags: { set: payload.Question.tags }, // Update tags
        links: {
          // Delete existing links and create new ones
          deleteMany: {}, // Delete all existing links
          create: payload.Question.links,
        },
      },
    })
    console.log(`UPDATED QUESTION WITH ID : ${payload.QuestionId}`);
    return question
  }

  console.log(`FAILED UPDATING QUESTION WITH ID : ${payload.QuestionId}`);

  throw new GraphQLError('You can update only your questions!!', {
    extensions: {
      code: 'NOT_AUTHORISED_FOR_UPDATING_QUESTION',
    },
  })
}

export {
  createQuestion,
  getQuestions,
  upVoteQuestion,
  downVoteQuestion,
  changeApproveStatusOfQue,
  deleteQuestion,
  updateQuestion,
  getQuestionById,
  getQuestionByIdHelper,
}
