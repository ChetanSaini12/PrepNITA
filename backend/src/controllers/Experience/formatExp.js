import { GraphQLError } from "graphql"
import { addLikeStatus } from "../../utils/addLikeStatus.js"
import { addUserName } from "./Comment/addUserName.js"
import { addNameExp } from "./addnameExp.js"

export const formatExp = async (experience, context) => {
    try {
        
      experience = await addLikeStatus(experience, context.userId, 'EXPERIENCE')
      experience = await addNameExp(experience)
      console.log('The length of exp.comments : ', experience)
      for (let i = 0; i < experience.comments?.length; i++) {
        experience.comments[i] = await addLikeStatus(
          experience.comments[i],
          context.userId,
          'EXP_COMMENT'
        )
        experience.comments[i] = await addUserName(experience.comments[i])
        for (let j = 0; j < experience.comments[i]?.reply?.length; j++) {
          experience.comments[i].reply[j] = await addLikeStatus(
            experience.comments[i].reply[j],
            context.userId,
            'EXP_REPLY'
          )
          experience.comments[i].reply[j] = await addUserName(
            experience.comments[i].reply[j]
          )
        }
      }
      return experience
    } catch (error) {
        console.log('ERROR WHILE FORMATTING EXP : ', error)
        throw new GraphQLError('Something went wrong')
    }
}
