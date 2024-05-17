import { changeApproveStatusOfQuiz } from "../../controllers/Quiz/changeApproveStatusOfQuiz.js"
import { createQuiz } from "../../controllers/Quiz/createQuiz.js"
import { deleteQuiz } from "../../controllers/Quiz/deleteQuiz.js"
import { getAllQuiz } from "../../controllers/Quiz/getAllQuiz.js"
import { getQuizById } from "../../controllers/Quiz/getQuizById.js"
import { updateQuiz } from "../../controllers/Quiz/updateQuiz.js"
import { checkRole } from "../../middlewares/checkRole.js"

const queries = {}

const mutations = {
    createQuiz : (_, payload, context) => checkRole({_, payload, context}, createQuiz),

    deleteQuiz : (_, payload, context) => checkRole({_, payload, context}, deleteQuiz),

    getQuizById : (_, payload, context) => checkRole({_, payload, context}, getQuizById),

    getAllQuiz : (_, payload) => getAllQuiz(_, payload),

    changeApproveStatusOfQuiz : (_, payload, context) => checkRole({_, payload, context}, changeApproveStatusOfQuiz),

    updateQuiz : (_, payload, context) => checkRole({_, payload, context}, updateQuiz)
}

export const resolvers = {queries, mutations}