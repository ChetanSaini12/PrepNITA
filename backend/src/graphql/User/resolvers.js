import { getAllUserData } from '../../controllers/allUser.controller.js'
import { createUserInDB } from '../../controllers/createUser.controller.js'
import {GraphQLError} from 'graphql'
const queries = {
  getAllUser: () => getAllUserData(),
}

const mutations = {
  createUser: (_, payload) => createUserInDB(_, payload),
  tempMut: (_, payload) => {
    console.log('PAYLOAD', payload.tempVal)
      throw new GraphQLError('temp mut error', {
        extensions : {
          code : 'FORBIDDEN'
        }
      })
      return payload.tempVal
  }
}

export const resolvers = { queries, mutations }
