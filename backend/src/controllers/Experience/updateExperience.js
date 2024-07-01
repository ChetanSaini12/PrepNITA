import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addNameExp } from './addnameExp.js'

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
      console.log(existingExp.createdBy, " ::: ", context.userId)
      if (existingExp.createdBy == context.userId) {
        let updatedExp = await prisma.experience.update({
          where: {
            id: payload.id,
          },
          data: {
            ...payload.Experience,
          },
          include: {
            comments : true
          }
        })
        updatedExp = await addLikeStatus(updatedExp, context.userId, 'EXPERIENCE')
        updatedExp = await addNameExp(updatedExp)
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
