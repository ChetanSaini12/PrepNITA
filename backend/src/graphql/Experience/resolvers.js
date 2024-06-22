
import { checkRole } from "../../middlewares/checkRole.js";
import { createExperience } from "../../controllers/Experience/createExperience.js";
import { getAllExperience } from "../../controllers/Experience/getAllExperience.js";
import { getExperienceById } from "../../controllers/Experience/getExperienceById.js";
import { deleteExperience } from "../../controllers/Experience/deleteExperience.js";
import { updateExperience } from "../../controllers/Experience/updateExperience.js";
import { upvoteExperience } from "../../controllers/Experience/upvoteExperience.js";
import { downvoteExperience } from "../../controllers/Experience/downvoteExperience.js";

const queries = {}

const mutations = {

    getAllExperience : (_, payload, context) => checkRole({_, payload, context}, getAllExperience),

    getExperienceById : (_, payload, context) => checkRole({_, payload, context}, getExperienceById),

    createExperience : (_, payload, context) => checkRole({_, payload, context}, createExperience),
    
    deleteExperience : (_, payload, context) => checkRole({_, payload, context}, deleteExperience),

    updateExperience : (_, payload, context) => checkRole({_, payload, context}, updateExperience),
    
    upvoteExperience : (_, payload, context) => checkRole({_, payload, context}, upvoteExperience),

    downvoteExperience : (_, payload, context) => checkRole({_, payload, context}, downvoteExperience),

}

export const resolvers = {queries, mutations}
