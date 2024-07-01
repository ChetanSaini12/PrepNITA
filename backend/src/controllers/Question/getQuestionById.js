import { addLikeStatus } from '../../utils/addLikeStatus.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js'

export const getQuestionById = async (_, payload, context) => {
  console.log('GETTING QUESTION BY ID : ', payload.QuestionId)
  let question = await getQuestionByIdHelper(payload.QuestionId)
  console.log(`GOT QUESTION WITH ID : ${payload.QuestionId} = ${question}`)
  question = addLikeStatus(question, context.userId, 'QUESTION')
  return question
}
