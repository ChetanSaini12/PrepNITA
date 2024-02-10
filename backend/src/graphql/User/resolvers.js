import {GraphQLError} from 'graphql'
import { createUserInDB, getAllUserData, loginUser } from '../../controllers/auth.constroller.js'
const queries = {
  getAllUser: () => getAllUserData(),
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
