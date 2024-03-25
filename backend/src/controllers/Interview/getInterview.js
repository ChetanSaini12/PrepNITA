import { prisma } from './../../../prisma/index.js'
import { GraphQLError } from 'graphql'

export const getInterview = (_, paylaod, res) => {
    try {
        const interview = prisma.interview.findMany({})
        // res.status(200).json(interview)
        return interview
    } catch (error) {
        throw new GraphQLError('Error while getting all interviews', {
            extensions : {
                code : 'ERROR_WHILE_GETTING_INTERVIEWS'
            }
        })
    }
}