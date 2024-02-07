import { getAllUserData } from '../../controllers/allUser.controller.js'
import { createUserInDB } from '../../controllers/createUser.controller.js'

const queries = {
  getAllUser: () => getAllUserData(),
}

const mutations = {
  createUser: (_, payload) => createUserInDB(_, payload),
  tempMut: (_, payload) => {
    console.log('PAYLOAD', payload.tempVal)
      return payload.tempVal
  }
}

export const resolvers = { queries, mutations }
