import { prisma } from './../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js'

export const getInterview = async (_, paylaod, res) => {
    try {
        var interview = await prisma.interview.findMany({})
        // res.status(200).json(interview)
        console.log('GET INTERVIEWS : ', JSON.stringify(interview));
        for(let i = 0; i < interview.length; i++)
        {
            interview[i] = interviewNameAdd(interview[i])
        }
        return interview
    } catch (error) {
        throw new GraphQLError('Error while getting all interviews', {
            extensions : {
                code : 'ERROR_WHILE_GETTING_INTERVIEWS'
            }
        })
    }
}