import { createQuestion, getQuestions } from "../../controllers/question.controller.js"
import { checkRole } from "../../middlewares/checkRole.js"

const queries = {
    tempQueQr : () => {return "RADHE"},
    getQuestions : () => getQuestions()
}

const mutations = {
    createQuestion : (_, payload, context) => checkRole({_, payload, context}, createQuestion),
    tempQuestion : (_, payload) => {return payload.tempVal}
}

export const resolvers = {queries , mutations}