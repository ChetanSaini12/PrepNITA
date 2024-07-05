import { gql } from '@apollo/client';

export const GET_ALL_QUESTIONS = gql`
     mutation getAllQuestions($title: String, $tags: [String]){
        getQuestions(title: $title, tags: $tags){
            id 
            description
            answer
            createdBy 
            creatorUsername
            creatorName
            tags 
            links {
                id
                title
                url
                questionId
              }
            isApproved 
            upvotes 
            downvotes
        }
    }
`;

export const CREATE_QUESTION = gql`
    mutation createQuestionMutation($Question: QuestionInput){
        createQuestion(Question: $Question){
            id 
            description
            answer
             createdBy
            tags 
            links {
                id
                title
                url
                questionId
              }
            isApproved 
            upvotes 
            downvotes
        }
    }
`;

export const GET_QUESTION_BY_ID = gql`
    mutation getQuestionByIdMutation($QuestionId:Int!){
        getQuestionById(QuestionId:$QuestionId){
            id 
            description
            answer
            createdBy
            creatorUsername
            creatorName
            tags 
            links {
                id
                title
                url
                questionId
              }
            isApproved 
            isVisible
            upvotes 
            downvotes
            isLiked
            isDisliked
        }
    }
`;

export const UP_VOTE_QUESTION = gql`
    mutation upVoteQuestionMutation($QuestionId:Int!){
        upVoteQuestion(QuestionId:$QuestionId){
            id
            upvotes 
            downvotes
            isLiked
            isDisliked
        }
    }
`;

export const DOWN_VOTE_QUESTION = gql`
    mutation downVoteQuestionMutation($QuestionId:Int!){
        downVoteQuestion(QuestionId:$QuestionId){
            id 
            upvotes 
            downvotes
            isLiked
            isDisliked
        }
    }
`;
// / changeApproveStatusOfQue(QuestionId : Int!) : Question

export const CHANGE_APPROVE_STATUS_OF_QUE = gql`
    mutation changeApproveStatusOfQueMutation($QuestionId:Int!){
        changeApproveStatusOfQue(QuestionId:$QuestionId){
            isApproved 
        }
    }
`;

export const CHANGE_VISIBILIY_STATUS_OF_QUE=gql`
    mutation changeVisibilityStatusOfQueMutation($QuestionId:Int!){
        changeVisibleStatusOfQue(QuestionId:$QuestionId){
            isVisible
        }
    }
`;

export const DELETE_QUESTION = gql`
    mutation deleteQuestionMutation($QuestionId:Int!){
        deleteQuestion(QuestionId:$QuestionId){
            status:String
        }
    }
`;

export const UPDATE_QUESTION = gql`
    mutation updateQuestionMutation($QuestionId:Int!,$Question:QuestionInput){
        updateQuestion(QuestionId:$QuestionId,Question:$Question){
            id 
            description
            answer
             createdBy
            tags 
            links {
                id
                title
                url
                questionId
              }
            isApproved 
            upvotes 
            downvotes
        }
    }
`;

export const TEMP_QUESTION = gql`
    mutation tempQuestionMutation($tempVal:String){
        tempQuestion(tempVal:$tempVal){
            status:String
        }
    }
`;


