import { GraphQLError } from "graphql";
import { prisma } from "../../../prisma/index.js"

export const getAttendesOfQuiz = async (_, payload) => {
    try {
        const quizAttendance = await prisma.quizAttendance.findMany({
            where: {
                quizId: payload.quizId,
            }
        })
        return quizAttendance;
    } catch (error) {
        throw new GraphQLError(error)
    }
}