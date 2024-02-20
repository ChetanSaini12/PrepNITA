import { GraphQLError } from "graphql"
import { getUserById } from "./getUserById.js"


export const getCurrentUser = async (_, __, context) => {
    if (context && context.userId) {
      try {
        const user = await getUserById(_, context.userId)
        console.log('Current User : ', user)
        return user
      } catch (error) {
        throw new GraphQLError('I dont know who are you', {
          extensions: {
            code: 'INVALID_USER_ID',
          },
        })
      }
    }
    throw new GraphQLError('I dont know who are you', {
      extensions: {
        code: 'INVALID_TOKEN',
      },
    })
}