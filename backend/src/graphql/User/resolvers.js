import { getAllUserData } from "../../controllers/allUser.controller.js";
import { createUserInDB } from "../../controllers/createUser.controller.js";

const queries = {
    getAllUser : () => getAllUserData()
}

const mutations = {
    createUser : (_, payload) => createUserInDB(_, payload)
}

export const resolvers = {queries, mutations}