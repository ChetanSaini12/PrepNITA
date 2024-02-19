import { changeApproveStatusOfQue } from "../../controllers/Question/changeApproveStatusOfQue.js"
import { createQuestion } from "../../controllers/Question/createQuestion.js"
import { deleteQuestion } from "../../controllers/Question/deleteQuestion.js"
import { downVoteQuestion } from "../../controllers/Question/downVoteQuestion.js"
import { getQuestionById } from "../../controllers/Question/getQuestionById.js"
import { getQuestions } from "../../controllers/Question/getQuestions.js"
import { upVoteQuestion } from "../../controllers/Question/upVoteQuestion.js"
import { updateQuestion } from "../../controllers/Question/updateQuestion.js"
import { checkRole } from "../../middlewares/checkRole.js"

const queries = {
    tempQueQr : () => {return "RADHE"},
    
    getQuestions : () => getQuestions()
}

const mutations = {
    createQuestion : (_, payload, context) => checkRole({_, payload, context}, createQuestion),

    getQuestionById : (_, payload, context) => checkRole({_, payload, context}, getQuestionById), 

    upVoteQuestion : (_, payload, context) => checkRole({_, payload, context}, upVoteQuestion),

    downVoteQuestion : (_, payload, context) => checkRole({_, payload, context}, downVoteQuestion),

    changeApproveStatusOfQue : (_, payload, context) => checkRole({_, payload, context}, changeApproveStatusOfQue),

    deleteQuestion : (_, payload, context) => checkRole({_, payload, context}, deleteQuestion),

    updateQuestion : (_, payload, context) => checkRole({_, payload, context}, updateQuestion),

    tempQuestion : (_, payload) => {return payload.tempVal}
}

export const resolvers = {queries , mutations}