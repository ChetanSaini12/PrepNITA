import {prisma} from '../../prisma/index.js'
export const createUserInDB = async (_, payload) => {
  const user = await prisma.user.create({
    data: payload.User,
  })
  return user
}
