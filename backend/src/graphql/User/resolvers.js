import { createUserInDB, loginUser } from '../../controllers/auth.controller.js'
import { getAllUserData, getCurrentUser, getUserById, updateUserRole } from '../../controllers/user.controller.js'
const queries = {
  getAllUser: () => getAllUserData(),
  getMe: (_,__, context) => getCurrentUser(_, __, context),
}

const mutations = {
  createUser: (_, payload) => createUserInDB(_, payload),
  loginUser: (_, payload) => loginUser(_, payload),
  updateUserRole : (_, payload) => updateUserRole(_, payload),
  getUserById: (_, payload) => getUserById(_, payload.id)
}

export const resolvers = { queries, mutations }
