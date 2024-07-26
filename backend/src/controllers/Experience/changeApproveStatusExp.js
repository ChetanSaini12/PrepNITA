import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { formatExp } from './formatExp.js'

export const changeApproveStatusOfExp = async (_, payload, context) => {
  try {
    console.log(
      'Change Approve Status of Experience with ID : ',
      payload.experienceId
    )
    if (context.isAdmin) {
      const existingExperience = await prisma.experience.findFirst({
        where : {
          id : payload.experienceId
        }
      })

      const updatedIsApproved = !existingExperience.isApproved

      let experience = await prisma.experience.update({
        where: { id: payload.experienceId },
        data: { isApproved: updatedIsApproved },
      })

      console.log(
        `Approve Status Changed of Experience with ID : ${payload.experienceId} - ${updatedIsApproved}`
      )
      experience = await formatExp(experience, context);
      return experience
    }
    console.log(
      `Failed Approve Status Change of Experience with ID : ${payload.experienceId}`
    )
    throw new GraphQLError(
      'You are not an authorised admin for changing approve status of a experience!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_ALTER_APPROVE_STATUS_EXPERIENCE',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code ===
        'NOT_AUTHORISED_FOR_ALTER_APPROVE_STATUS_EXPERIENCE'
    ) {
      throw error
    } else {
      throw new GraphQLError(
        'Error while changing approve status of experience!!',
        {
          extensions: {
            code: 'CHANGE_APPROVE_STATUS_FAILED',
          },
        }
      )
    }
  }
}
