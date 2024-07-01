import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addNameExp } from './addnameExp.js'
import { addUserName } from './Comment/addUserName.js'
import { addLikeStatus } from '../../utils/addLikeStatus.js'
import { formatExp } from './formatExp.js'

export const getExperienceById = async (_, payload, context) => {
  try {
    /*
            payload : {experienceId}
        */
    let experience = await prisma.experience.findFirst({
      where: {
        id: payload.experienceId,
      },
      include: {
        comments: {
          include: {
            reply: true,
          },
        },
      },
    })
    experience = await formatExp(experience, context)
    return experience
  } catch (error) {
    console.log('Error while getting experience by id : ', error)
    throw new GraphQLError('Something went wrong!!')
  }
}
