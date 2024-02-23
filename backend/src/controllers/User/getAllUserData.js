import { prisma } from "../../../prisma/index.js";

export const getAllUserData = async (_, payload) => {
    console.log('Get All User Data with filet : ', JSON.stringify(payload));
    const users = await prisma.user.findMany({
      where : payload.user
    });
    console.log(users)
    return users
}