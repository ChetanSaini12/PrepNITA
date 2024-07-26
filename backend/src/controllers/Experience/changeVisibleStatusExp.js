import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { formatExp } from './formatExp.js'

export const changeVisibleStatusOfExp = async (_, payload, context) => {
  try {
    console.log(
      'Change Visible Status of Experience with ID : ',
      payload.experienceId
    )
    const existingExperience = await prisma.experience.findFirst({
      where : {
        id : payload.experienceId
      }
    })
    if (context.isAdmin || existingExperience.createdBy === context.userId) {

      const updatedIsVisible = !existingExperience.isVisible

      let experience = await prisma.experience.update({
        where: { id: payload.experienceId },
        data: { isVisible: updatedIsVisible },
      })

      console.log(
        `Visible Status Changed of Experience with ID : ${payload.experienceId} - ${updatedIsVisible}`
      )
      experience = await formatExp(experience, context);
      return experience
    }
    console.log(
      `Failed Visible Status Change of Experience with ID : ${payload.experienceId}`
    )
    throw new GraphQLError(
      'You are not an authorised admin or creator of this experience for changing visible status of a experience!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_ALTER_VISIBLE_STATUS_EXPERIENCE',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code ===
        'NOT_AUTHORISED_FOR_ALTER_VISIBLE_STATUS_EXPERIENCE'
    ) {
      throw error
    } else {
      throw new GraphQLError(
        'Error while changing visible status of experience!!',
        {
          extensions: {
            code: 'CHANGE_VISIBLE_STATUS_FAILED',
          },
        }
      )
    }
  }
}
