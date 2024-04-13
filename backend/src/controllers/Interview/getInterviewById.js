import { prisma } from './../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js'

export const getInterviewById = async (_, paylaod, res) => {
    try {
        var interview = await prisma.interview.findFirst({
            where : {
                id : paylaod.interviewId
            }
        })
        interview = interviewNameAdd(interview)
        return interview
    } catch (error) {
        throw new GraphQLError('Error while getting interview by Id', {
            extensions : {
                code : 'ERROR_WHILE_GETTING_INTERVIEW_BY_ID'
            }
        })
    }
}