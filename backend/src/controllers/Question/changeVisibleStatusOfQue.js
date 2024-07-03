import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addUserDetails } from '../../utils/addUserDetails.js'

export const changeVisibleStatusOfQue = async (_, payload, context) => {
  /*
        payload : {
            questionId
        }
        Admin or Question Owner can changer visibleStatus
    */
  console.log(
    'Request to update visiblity status of que : ',
    JSON.stringify(payload)
  )
  try {
    const question = await prisma.question.findFirst({
      where: {
        id: payload.QuestionId,
      },
    })
    if (context.isAdmin || question.createdBy === context.userId) {
      if (question) {
        const currenVisibleStatus = question.isVisible
        const updatedVisibleStatus = !currenVisibleStatus
        console.log('UPDATED : ', updatedVisibleStatus, ' CURRENT : ', currenVisibleStatus);
        console.log('HEHE : ', payload.QuestionId)
        let updatedQuestion = await prisma.question.update({
          where: {
            id: payload.QuestionId,
          },
          data: {
            isVisible: updatedVisibleStatus,
          },
        })
        console.log(
          `Updated Visible Status of Question with ID : ${payload.QuestionId} - ${updatedVisibleStatus}`
        )
        updatedQuestion = await addUserDetails(updatedQuestion, updatedQuestion.createdBy)
        return updatedQuestion
      } else {
        throw new GraphQLError("Question with given questionId doesn't exist", {
          extensions: {
            code: 'QUESTION_NOT_FOUND',
          },
        })
      }
    }
    else 
    {
      throw new GraphQLError('You are not allowed to change the status of this question', {
        extensions : {
          code : "NOT_AUTHORISED"
        }
      })
    }
  } catch (error) {
    console.log('Error while updating visible status of question : ', error)
    if (error.extensions && error.extensions.code === 'QUESTION_NOT_FOUND' || error.extensions.code === 'NOT_AUTHORISED') {
      throw error
    } else {
      throw new GraphQLError(
        'Error while changing visible status of question!!',
        {
          extensions: {
            code: 'CHANGE_VISIBLE_STATUS_QUESTION_FAILED',
          },
        }
      )
    }
  }
}
