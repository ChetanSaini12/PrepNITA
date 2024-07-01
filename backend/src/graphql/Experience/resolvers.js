
import { checkRole } from "../../middlewares/checkRole.js";
import { createExperience } from "../../controllers/Experience/createExperience.js";
import { getAllExperience } from "../../controllers/Experience/getAllExperience.js";
import { getExperienceById } from "../../controllers/Experience/getExperienceById.js";
import { deleteExperience } from "../../controllers/Experience/deleteExperience.js";
import { updateExperience } from "../../controllers/Experience/updateExperience.js";
import { upvoteExperience } from "../../controllers/Experience/upvoteExperience.js";
import { downvoteExperience } from "../../controllers/Experience/downvoteExperience.js";
import { addCommentExp } from "../../controllers/Experience/Comment/addCommentExp.js";
import { addReplyToExpComment } from "../../controllers/Experience/Comment/addReplyToExpComment.js";
import { deleteExpComment } from "../../controllers/Experience/Comment/deleteExpComment.js";
import { deleteExpReply } from "../../controllers/Experience/Comment/deleteExpReply.js";
import { likeExpComment } from "../../controllers/Experience/Comment/likeExpComment.js";
import { likeExpCommentReply } from "../../controllers/Experience/Comment/likeExpCommentReply.js";

const queries = {}

const mutations = {

    getAllExperience : (_, payload, context) => getAllExperience(_, payload, context),

    getExperienceById : (_, payload, context) => getExperienceById(_, payload, context),

    createExperience : (_, payload, context) => checkRole({_, payload, context}, createExperience),
    
    deleteExperience : (_, payload, context) => checkRole({_, payload, context}, deleteExperience),

    updateExperience : (_, payload, context) => checkRole({_, payload, context}, updateExperience),
    
    upvoteExperience : (_, payload, context) => checkRole({_, payload, context}, upvoteExperience),

    downvoteExperience : (_, payload, context) => checkRole({_, payload, context}, downvoteExperience),

    
    addCommentExp : (_, payload, context) => checkRole({_, payload, context}, addCommentExp),
    
    addReplyToExpComment : (_, payload, context) => checkRole({_, payload, context}, addReplyToExpComment),
    
    deleteExpComment : (_, payload, context) => checkRole({_, payload, context}, deleteExpComment),
    
    deleteExpReply : (_, payload, context) => checkRole({_, payload, context}, deleteExpReply),
    
    likeExpComment : (_, payload, context) => checkRole({_, payload, context}, likeExpComment),
    
    likeExpCommentReply : (_, payload, context) => checkRole({_, payload, context}, likeExpCommentReply),
    
}

export const resolvers = {queries, mutations}
