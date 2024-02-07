import {prisma} from '../../prisma/index.js'

export const getAllUserData = () => {
    console.log("Hello from allUse.c.js")
    return prisma.$queryRaw`SELECT * FROM "User"`
}