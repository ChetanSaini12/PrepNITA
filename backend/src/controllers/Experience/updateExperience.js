import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const updateExperience = async (_, payload, context) => {
  try {
    /*
        payload : {
            id,
            Experience : {}
        }
        */
    const existingExp = await prisma.experience.findFirst({
      where: {
        id: payload.id,
      },
    })
    if (existingExp) {
      if (existingExp.createdBy == context.id) {
        const updatedExp = await prisma.experience.update({
          where: {
            id: payload.id,
          },
          data: {
            ...payload.Experience,
          },
        })
        return updatedExp
      } else {
        throw new GraphQLError(
          'You are not authorised to update this experience!!'
        )
      }
    } else {
      throw new GraphQLError('Experience not found!!')
    }
  } catch (error) {
    throw error
  }
}
