import {GraphQLError} from 'graphql'
import { createUserInDB, getAllUserData, getCurrentUser, loginUser } from '../../controllers/auth.constroller.js'
const queries = {
  getAllUser: () => getAllUserData(),
  getMe: (_,__, context) => getCurrentUser(_, __, context)
}

const mutations = {
  createUser: (_, payload) => createUserInDB(_, payload),
  tempMut: (_, payload) => {
    console.log('PAYLOAD', payload.tempVal)
    // throw new GraphQLError('temp mut error', {
    //   extensions : {
    //     code : 'FORBIDDEN'
    //   }
    // })
    return payload.tempVal
  },
  loginUser: (_, payload) => loginUser(_, payload)
}

export const resolvers = { queries, mutations }
