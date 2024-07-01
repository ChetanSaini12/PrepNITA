import { gql } from '@apollo/client';

// export const CREATE_EXPERIENCE = gql``;

export const CREATE_EXPERIENCE = gql`
    mutation createExperienceMutation($Experience : InputExperience){
        createExperience(Experience : $Experience){
            id
        }
    }
`;

export const GET_ALL_EXPERIENCE = gql`
    mutation getAllExperienceMutaiton{
        getAllExperience{
         id
         company
         role
         description
         anonymous
         createdBy
         creatorName
         creatorUsername
         createdAt
         upvotes
         downvotes
         comments{id}
        }
    }
`;

export const GET_EXPERIENCE_BY_ID = gql`
    mutation getExperienceByIdMutation($experienceId : Int!){
        getExperienceById(experienceId : $experienceId){
            id
            company
            role
            description
            anonymous
            createdBy
            creatorName
            creatorUsername
            createdAt
            comments{
                id
                experienceId
                description
                reply{
                    id
                    expcommentId
                    description
                    replierId
                    replierUserName
                    likes
                    isLiked
                    isDisliked
                }
                commentorId
                commentorUserName
                likes
                isLiked
                isDisliked
            }
            upvotes
            downvotes
            isLiked
            isDisliked
        }
    }
`;

export const UPVOTE_EXPERIENCE = gql`
    mutation upvoteExperienceMutation($id : Int!){
        upvoteExperience(id : $id){
            id
            upvotes
            downvotes
            isLiked
            isDisliked
        }
    }
`;
export const DOWNVOTE_EXPERIENCE = gql`
    mutation downvoteExperienceMutation($id : Int!){
        downvoteExperience(id : $id){
            id
            upvotes
            downvotes
            isLiked
            isDisliked
        }
    }
`;
export const ADD_COMMENT_EXP = gql`
    mutation addCommentExpMutation($Comment : InputExpComment){
        addCommentExp(Comment : $Comment){
             id 
             experienceId
             description
                reply{
                 id
                 expcommentId
                 description
                 replierId
                 replierUserName
                 likes
                 isLiked
                 isDisliked
                }
                commentorId
                commentorUserName
                likes
                isLiked
                isDisliked
        }
    }
`;
export const ADD_REPLY_TO_EXP_COMMENT = gql`
    mutation addReplyToExpCommentMutation($Reply : InputExpReply){
        addReplyToExpComment(Reply : $Reply){
            id
            expcommentId
            description
            replierId
            replierUserName
            likes
            isLiked
            isDisliked
        }
    }
`;
export const DELETE_EXP_COMMENT = gql`
    mutation deleteExpCommentMutation($commentId : Int){
        deleteExpComment(commentId : $commentId){
            id
        }
    }
`;
export const DELETE_EXP_REPLY = gql`
    mutation deleteExpReplyMutation($replyId : Int){
        deleteExpReply(replyId : $replyId){
            id
        }
    }
`;
export const LIKE_EXP_COMMENT = gql`
    mutation likeExpCommentMutation($commentId : Int){
        likeExpComment(commentId : $commentId){
          id 
             experienceId
             description
                reply{
                 id
                 expcommentId
                 description
                 replierId
                 replierUserName
                 likes
                 isLiked
                 isDisliked
                }
                commentorId
                commentorUserName
                likes
                isDisliked
                isLiked
        }
    }
`;
export const LIKE_EXP_COMMENT_REPLY = gql`
    mutation likeExpCommentReplyMutation($replyId : Int){
        likeExpCommentReply(replyId : $replyId){
            id
            expcommentId
            description
            replierId
            replierUserName
            likes
            isDisliked
            isLiked
        }
    }
`;
export const DELETE_EXPERIENCE = gql`
    mutation deleteExperienceMutation($id : Int!){
        deleteExperience(id : $id){
            id
        }
    }
`;
export const UPDATE_EXPERIENCE = gql`
    mutation updateExperienceMutation($id : Int!, $Experience : InputExperience){
        updateExperience(id : $id, Experience : $Experience){
            id
        }
    }
`;

