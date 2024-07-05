import { prisma } from '../../prisma/index.js'
import { GraphQLError } from 'graphql'

export const addUserDetails = async (entity, userId) => {
  try {
    const creator = await prisma.userInformation.findFirst({
      where: {
        userId,
      },
    })
    entity.creatorName = creator.name
    entity.creatorUsername = creator.username
    return entity
  } catch (error) {
    throw new GraphQLError('Something went wrong!!')
  }
}
