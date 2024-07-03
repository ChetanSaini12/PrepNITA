import { prisma } from '../../../prisma/index.js'

export const interviewNameAdd = async (interview) => {
  const interviewee = await prisma.userInformation.findFirst({
    where: {
      id: interview.intervieweeId,
    },
  });
  console.log('interviewee : ', interviewee);
  interview['intervieweeName'] = interviewee?.name 
  interview['intervieweeEmail'] = interviewee?.email
  interview['intervieweeUsername'] = interviewee?.username
  if (interview.interviewerId) {
    const interviewer = await prisma.userInformation.findFirst({
      where: {
        id: interview.interviewerId,
      },
    });
    console.log('Interviewer : ', interviewer);
    interview['interviewerName'] = interviewer?.name
    interview['interviewerEmail'] = interviewer?.email
    interview['interviewerUsername'] = interviewer?.username
  }
  console.log('INTERVIEW in function : ', interview);
  return interview
}
