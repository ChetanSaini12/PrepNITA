import { GraphQLError } from "graphql";
import { prisma } from "../../../prisma/index.js";

export const getExperienceById = async (_, payload) => {
    try {
        /*
            payload : {experienceId}
        */
        const experience = await prisma.experience.findFirst({
            where: {
                id: payload.experienceId
            }
        })
        return experience;
    } catch (error) {
        throw new GraphQLError('Something went wrong!!')
    }
}