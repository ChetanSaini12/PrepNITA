import { prisma } from "../../../../prisma/index.js"
import { GraphQLError } from 'graphql'

export const addUserName = async (commentORreply) => {
    console.log("HELLO FROM ADD_USER_NAME : ", JSON.stringify(commentORreply));
    try {
        const userId = commentORreply.commentorId ? commentORreply.commentorId : commentORreply.replierId
        const creator = await prisma.userInformation.findFirst({
            where : {
                userId : userId
            }
        })
        commentORreply.commentorId ? (commentORreply.commentorUserName = creator.username) : (commentORreply.replierUserName = creator.username)
        return commentORreply;
    } catch (error) {
        console.log('ERROR WHILE ADDING USERNAME : ', error);
        throw new GraphQLError("Something went wrong!!");
    }
}