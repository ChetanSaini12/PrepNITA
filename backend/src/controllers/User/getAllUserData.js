import { prisma } from "../../../prisma/index.js";

export const getAllUserData = async () => {
    console.log('Get All User Data')
    const users = await prisma.user.findMany();
    console.log(users)
    return users
  }