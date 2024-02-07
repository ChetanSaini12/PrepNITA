import {prisma} from '../../prisma/index.js'
import {GraphQLError} from 'graphql'

export const getAllUserData = () => {

    console.log("Get All User Data");

    // throw new GraphQLError('You are not authorized to perform this action.' , {
    //     extensions: {
    //         code: 'FORBIDDEN',
    //     },
    // })
    const users = prisma.$queryRaw`SELECT * FROM "User"`
    console.log(users);
    return users;
}