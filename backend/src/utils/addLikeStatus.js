import { GraphQLError } from 'graphql'
import { prisma } from '../../prisma/index.js'

export const addLikeStatus = async (entity, userId, type) => {
  try {
    console.log("QUERY TO ADD LIKE STATUS : ", JSON.stringify(entity), " -- TYPE : ", type)
    const voteEntry = await prisma.userVotes.findFirst({
      where: {
        userId,
        area: type,
        areaId: entity.id,
      },
    })

    entity.isLiked = (voteEntry && voteEntry.type == 'LIKE') ? true : false
    entity.isDisliked = (voteEntry && voteEntry.type == 'DISLIKE') ? true : false

    return entity
  } catch (error) {
    console.log('ERROR : ', error);
    throw new GraphQLError("Error while adding like status to entity", {
        extensions : {
            code : "ERROR_WHILE_ATTACHING_LIKE_STATUS"
        }
    })
  }
}
