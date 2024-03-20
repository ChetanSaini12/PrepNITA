import { prisma } from "../../../prisma/index.js"

export const interviewNameAdd = async (interview) => {
    interview["intervieweeName"] = (await prisma.userInformation.findFirst({
        where : {
          id : interview.intervieweeId
        }
      }))?.name
      interview["interviewerName"] = (await prisma.userInformation.findFirst({
        where : {
          id : interview.interviewerId
        }
      }))?.name

      return interview
}