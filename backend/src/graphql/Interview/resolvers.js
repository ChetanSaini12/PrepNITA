import { createInterview } from "../../controllers/Interview/createInterview.js";
import { assignInterview } from "../../controllers/Interview/assignInterview.js";
import { deleteInterview } from "../../controllers/Interview/deleteInterview.js";
import { giveFeedback } from "../../controllers/Interview/giveFeedback.js";
import { revokeInterview } from "../../controllers/Interview/revokeInterview.js";
import { updateInterview } from "../../controllers/Interview/updateInterview.js";
import { checkRole } from "../../middlewares/checkRole.js";

const queries = {}

const mutations = {

    createInterview : (_, payload, context) => checkRole({_, payload, context}, createInterview),

    assignInterview : (_, payload, context) => checkRole({_, payload, context}, assignInterview),

    deleteInterview : (_, payload, context) => checkRole({_, payload, context}, deleteInterview),

    giveFeedback : (_, payload, context) => checkRole({_, payload, context}, giveFeedback),

    revokeInterview : (_, payload, context) => checkRole({_, payload, context}, revokeInterview),

    updateInterview : (_, payload, context) => checkRole({_, payload, context}, updateInterview),

}

export const resolvers = {queries, mutations}
