import { getQuizByIdHelper } from "./getQuizByIdHelper"

export const getQuizById = async (_, payload) => {
    try {
        const quiz = await getQuizByIdHelper(payload.id)
        return quiz
    } catch (error) {
        throw new GraphQLError('Error while fetching quiz', {
            extensions : {
                code : 'FETCH_QUIZ_FAILED'
            }
        })
    }
}