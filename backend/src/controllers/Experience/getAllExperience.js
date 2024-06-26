import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { addNameExp } from './addnameExp.js'

export const getAllExperience = async (_, payload) => {
  try {
    let experience = await prisma.experience.findMany(
      {
        include: {
          comments : true
        }
      }
    )
    for (let i = 0; i < experience.length; i++) {
      experience[i] = addNameExp(experience[i])
    }
    return experience
  } catch (error) {
    console.log("ERROR WHILE GETTING ALL EXPS : ", error);
    throw new GraphQLError('Something went wrong!!')
  }
}
