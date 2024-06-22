import { GraphQLError } from "graphql"
import { prisma } from "../../../prisma/index.js";

export const getAllExperience = async (_, payload) => {
    try {
        const experience = await prisma.experience.findMany({})
        return experience
    } catch (error) {
        throw new GraphQLError('Something went wrong!!');
    }
}