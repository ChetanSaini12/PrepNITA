import { GraphQLError } from "graphql";
import { prisma } from "../../../prisma/index.js";
import { addNameExp } from "./addnameExp.js";

export const getExperienceById = async (_, payload) => {
    try {
        /*
            payload : {experienceId}
        */
        let experience = await prisma.experience.findFirst({
            where: {
                id: payload.experienceId
            }
        })
        experience = addNameExp(experience)
        return experience;
    } catch (error) {
        throw new GraphQLError('Something went wrong!!')
    }
}