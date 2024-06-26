import { addQuestionsToQuiz } from "../../controllers/Quiz/addQuestiontoQuiz.js"
import { changeApproveStatusOfQuiz } from "../../controllers/Quiz/changeApproveStatusOfQuiz.js"
import { changeVisibleStatusOfQuiz } from "../../controllers/Quiz/changeVisibleStatusOfQuiz.js"
import { createQuiz } from "../../controllers/Quiz/createQuiz.js"
import { deleteQuiz } from "../../controllers/Quiz/deleteQuiz.js"
import { deleteQuizQuestion } from "../../controllers/Quiz/deleteQuizQuestion.js"
import { getAllQuiz } from "../../controllers/Quiz/getAllQuiz.js"
import { getAttendesOfQuiz } from "../../controllers/Quiz/getAttendesOfQuiz.js"
import { getQuizById } from "../../controllers/Quiz/getQuizById.js"
import { getQuizResponseForUser } from "../../controllers/Quiz/getQuizResponseForUser.js"
import { setResponse } from "../../controllers/Quiz/setResponse.js"
import { updateQuiz } from "../../controllers/Quiz/updateQuiz.js"
import { checkRole } from "../../middlewares/checkRole.js"

const queries = {}

const mutations = {
    createQuiz : (_, payload, context) => checkRole({_, payload, context}, createQuiz),

    deleteQuiz : (_, payload, context) => checkRole({_, payload, context}, deleteQuiz),

    getQuizById : (_, payload, context) => checkRole({_, payload, context}, getQuizById),

    getAllQuiz : (_, payload) => getAllQuiz(_, payload),

    changeApproveStatusOfQuiz : (_, payload, context) => checkRole({_, payload, context}, changeApproveStatusOfQuiz),

    changeVisibleStatusOfQuiz : (_, payload, context) => checkRole({_, payload, context}, changeVisibleStatusOfQuiz),

    updateQuiz : (_, payload, context) => checkRole({_, payload, context}, updateQuiz),

    addQuestionToQuiz : (_, payload, context) => checkRole({_, payload, context}, addQuestionsToQuiz),

    deleteQuestionOfQuiz : (_, payload, context) => checkRole({_, payload, context}, deleteQuizQuestion),

    getAttendesOfQuiz : (_, payload, context) => checkRole({_, payload, context}, getAttendesOfQuiz),

    getQuizResponseForUser : (_, payload, context) => checkRole({_, payload, context}, getQuizResponseForUser),

    setResponse : (_, payload, context) => checkRole({_, payload, context}, setResponse)
}

export const resolvers = {queries, mutations}