import { prisma } from '../../../prisma/index.js'

export const interviewNameAdd = async (interview) => {
  const interviewee = await prisma.userInformation.findFirst({
    where: {
      id: interview.intervieweeId,
    },
  });
  interview['intervieweeName'] = interviewee?.name
  interview['intervieweeEmail'] = interviewee?.email
  if (interview.interviewerId) {
    const interviewer = await prisma.userInformation.findFirst({
      where: {
        id: interview.interviewerId,
      },
    });
    interview['interviewerName'] = interviewer?.name
    interview['interviewerEmail'] = interviewer?.email
  }

  return interview
}
