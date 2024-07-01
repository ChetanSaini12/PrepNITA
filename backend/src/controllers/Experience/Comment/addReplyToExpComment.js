import { GraphQLError } from 'graphql'
import { prisma } from '../../../../prisma/index.js'
import { addUserName } from './addUserName.js'
import { addLikeStatus } from '../../../utils/addLikeStatus.js'

export const addReplyToExpComment = async (_, payload, context) => {
  try {
    /*
            payload : 
             Reply :   {
                    description : String ("A good comment")
                    expcommentId : Int
                }
        */
    const comment = await prisma.expComment.findFirst({
      where: {
        id: payload.expcommentId,
      },
    })
    if(!comment)
        {
            throw new GraphQLError("Comment Doesn't exist!!", {
                extensions : {
                    code : "NO_COMMENT"
                }
            })
        }
    if (context.isUser) {
      let expReply = await prisma.expReply.create({
        data: {
          description: payload.Reply.description,
          expcommentId: payload.Reply.expcommentId,
          replierId: context.userId,
        },
      })
      expReply = await addLikeStatus(expReply, context.userId, 'EXP_REPLY')
      expReply = await addUserName(expReply)
      return expReply
    } else {
      throw new GraphQLError('User is not authorised', {
        extensions: {
          code: 'NOT_AUTH',
        },
      })
    }
  } catch (error) {
    if (error & error.extensions && (error.extensions.code == 'NOT_AUTH' || error.extensions.code == 'NO_COMMENT')) {
      throw error
    }
    throw new GraphQLError('Something went wrong!!')
  }
}
