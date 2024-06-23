import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import moment from 'moment'
import { addNameExp } from './addnameExp.js'
export const createExperience = async (_, payload, context) => {
  try {
    /*
        payload : 
        {
            company : "google"
            role : "software engineer"
            anonymous : true/false
            description : "worked as a software engineer"
        }
    */
    if (context.isUser) {
      let experience = await prisma.experience.create({
        data: {
          company: payload.Experience.company,
          role: payload.Experience.role,
          anonymous: payload.Experience.anonymous,
          description: payload.Experience.description,
          createdAt: moment(),
          createdBy: context.userId,
        },
      })
      experience = addNameExp(experience)
      return experience
    } else {
      throw new GraphQLError('User is not authorised!!', {
        extensions: {
          code: 'USER_IS_NOT_AUTHORISED',
        },
      })
    }
  } catch (error) {
    if (
      error &&
      error.extensions &&
      error.extensions.code === 'USER_IS_NOT_AUTHORISED'
    ) {
      throw error
    } else {
      throw new GraphQLError('Something went wrong!!', {
        extensions: {
          code: 'SOMETHING_WENT_WRONG!!',
        },
      })
    }
  }
}
