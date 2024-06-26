import { prisma } from './../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js'

export const getInterview = async (_, payload, res) => {
    try {
        console.log('HELLO FROM GET-INTERVIEWS', JSON.stringify(payload));
        var interview = await prisma.interview.findMany({where : payload
        })
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