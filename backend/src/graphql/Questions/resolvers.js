import { changeApproveStatusOfQue, createQuestion, deleteQuestion, downVoteQuestion, getQuestions, upVoteQuestion, updateQuestion } from "../../controllers/question.controller.js"
import { checkRole } from "../../middlewares/checkRole.js"

const queries = {
    tempQueQr : () => {return "RADHE"},
    
    getQuestions : () => getQuestions()
}

const mutations = {
    createQuestion : (_, payload, context) => checkRole({_, payload, context}, createQuestion),

    upVoteQuestion : (_, payload, context) => checkRole({_, payload, context}, upVoteQuestion),

    downVoteQuestion : (_, payload, context) => checkRole({_, payload, context}, downVoteQuestion),

    changeApproveStatusOfQue : (_, payload, context) => checkRole({_, payload, context}, changeApproveStatusOfQue),

    deleteQuestion : (_, payload, context) => checkRole({_, payload, context}, deleteQuestion),

    updateQuestion : (_, payload, context) => checkRole({_, payload, context}, updateQuestion),

    tempQuestion : (_, payload) => {return payload.tempVal}
}

export const resolvers = {queries , mutations}