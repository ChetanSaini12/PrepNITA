import { getQuizByIdHelper } from "./getQuizByIdHelper.js"
import { GraphQLError } from 'graphql'
export const getQuizById = async (_, payload) => {
    console.log('GET QUIZ BY ID WITH PAYLOAD', JSON.stringify(payload));
    try {
        const quiz = await getQuizByIdHelper(payload.QuizId)
        return quiz
    } catch (error) {
        console.log('ERROR WHILE FETCHING QUIZ : ', error);
        throw new GraphQLError('Error while fetching quiz', {
            extensions : {
                code : 'FETCH_QUIZ_FAILED'
            }
        })
    }
}