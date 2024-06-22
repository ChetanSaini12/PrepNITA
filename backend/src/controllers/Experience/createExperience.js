import { prisma } from '../../../prisma/index.js'

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
      const experience = await prisma.experience.create({
        data: {
          company: payload.company,
          role: payload.role,
          anonymous: payload.anonymous,
          description: payload.description,
          //   createdAt:
          createdBy: context.userId,
        },
      })
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
