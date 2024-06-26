import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addNameExp } from './addnameExp.js'
import { addUserName } from './Comment/addUserName.js'

export const getExperienceById = async (_, payload) => {
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
          include : {
            reply : true
          }
        }
      },
    })
    experience = await addNameExp(experience)
    console.log('The length of exp.comments : ', experience);
    for (let i = 0; i < experience.comments?.length; i++) {
      experience.comments[i] = await addUserName(experience.comments[i])
      for(let j = 0; j < experience.comments[i]?.reply?.length; j++) {
        experience.comments[i].reply[j] = await addUserName(experience.comments[i].reply[j])
      }
    }
    return experience
  } catch (error) {
    console.log('Error while getting experience by id : ', error);
    throw new GraphQLError('Something went wrong!!')
  }
}
