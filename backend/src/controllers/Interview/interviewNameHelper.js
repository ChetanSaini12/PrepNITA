import { prisma } from '../../../prisma/index.js'

export const interviewNameAdd = async (interview) => {
  interview['intervieweeName'] = (
    await prisma.userInformation.findFirst({
      where: {
        id: interview.intervieweeId,
      },
    })
  )?.name
  if (interview.interviewerId) {
    interview['interviewerName'] = (
      await prisma.userInformation.findFirst({
        where: {
          id: interview.interviewerId,
        },
      })
    )?.name
  }

  return interview
}
