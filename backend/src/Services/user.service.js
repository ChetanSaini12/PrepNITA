import { prisma } from "../../prisma/index.js"

export const getUserById = async (userId) => {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })
    return user
}