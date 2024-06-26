import { prisma } from '../../../../prisma/index.js'
import { GraphQLError } from 'graphql'
import { addUserName } from './addUserName.js'
export const addCommentExp = async (_, payload, context) => {
  try {
    /*
        payload : 
          Comment :  {
                description : String ("A good experience")
                experienceId : Int
            }
        */
    if (context.isUser) {
      let expComment = await prisma.expComment.create({
        data: {
          description: payload.Comment.description,
          experienceId: payload.Comment.experienceId,
          commentorId: context.userId,
        },
      })
      expComment = addUserName(expComment)
      return expComment
    } else {
      throw new GraphQLError('User is not authorised', {
        extensions: {
          code: 'NOT_AUTH',
        },
      })
    }
  } catch (error) {
    if (error & error.extensions && error.extensions.code == 'NOT_AUTH') {
      throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
