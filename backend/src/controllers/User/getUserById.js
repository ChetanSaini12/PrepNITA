import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const getUserById = async (_, id) => {
  try {
    console.log('GETTING USER -> id : ', id)
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        authentication: true,
        userInformation: true
      }
    })
    return user
  } catch (error) {
    console.log('ERROR WHILE FINDING USER BY ID : ', error)
    throw new GraphQLError('I dont know who are you', {
      extensions: { code: 'INVALID_ID' },
    })
  }
}
