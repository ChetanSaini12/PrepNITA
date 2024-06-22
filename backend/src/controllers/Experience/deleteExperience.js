import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const deleteExperience = async (_, payload, context) => {
  try {
    const existingExp = await prisma.experience.findFirst({
      where: {
        id: payload.id,
      },
    })
    if (existingExp) {
      if (existingExp.createdBy == context.id) {
        const deletedExp = await prisma.experience.delete({
          where: {
            id: payload.id,
          },
        })
        return deletedExp
      } else {
        throw new GraphQLError(
          'You are not authorised to delete this experience!!'
        )
      }
    } else {
      throw new GraphQLError('Experience not found!!')
    }
  } catch (error) {
    throw error
  }
}
