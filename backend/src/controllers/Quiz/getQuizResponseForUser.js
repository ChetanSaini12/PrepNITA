import { GraphQLError } from "graphql";
import { prisma } from "../../../prisma/index.js"

export const getQuizResponseForUser = async (_, payload) => {
    try {
        const quizResponse = await prisma.quizAttendance.findFirst({
            where: {
                userId: payload.userId,
                quizId: payload.quizId
            }
        })
        return quizResponse;
    } catch (error) {
        throw new GraphQLError(error)
    }
}