import { prisma } from "../../../prisma/index.js"
import { GraphQLError } from 'graphql'

export const addNameExp = async (experience) => {
    try {
        const creator = await prisma.userInformation.findFirst({
            where : {
                userId : experience.createdBy
            }
        })
        experience.creatorName = creator.name;
        experience.creatorUsername = creator.username;
        return experience;
    } catch (error) {
        throw new GraphQLError("Something went wrong!!");
    }
}