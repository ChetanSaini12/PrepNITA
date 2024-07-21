import { prisma } from './../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { interviewNameAdd } from './interviewNameHelper.js'
import { filterData } from '../../utils/filteration.js'

export const getInterview = async (_, payload, res) => {
  try {
    var interview = await prisma.interview.findMany({ where: payload.Interview })
    for (let i = 0; i < interview.length; i++) {
      interview[i] = await interviewNameAdd(interview[i])
    }
    interview = filterData(interview, payload.filter)
    console.log("Interview2 : ", interview)
    return interview
  } catch (error) {
    throw new GraphQLError('Error while getting all interviews', {
      extensions: {
        code: 'ERROR_WHILE_GETTING_INTERVIEWS',
      },
    })
  }
}
