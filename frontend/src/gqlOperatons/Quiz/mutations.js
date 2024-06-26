// createQuiz(Quiz : quizInput) : Quiz
import { gql } from '@apollo/client';
export const CREATE_QUIZ = gql`
    mutation createQuizMutation($Quiz: quizInput){
        createQuiz(Quiz: $Quiz){
            id 
            createdBy
            title
            description
            questions {
                id
                quizId
                description
                options
                correctOption
            }
            isVisible
            isApproved
            startTime
            endTime
            QuizAttendees {
                id
                quizId
                userId
                score
            }
        }
    }
`;

export const GET_ALL_QUIZ = gql`
    mutation getAllQuizMutation{
        getAllQuiz{
            id 
            createdBy
            title
            description
            isVisible
            isApproved
            startTime
            endTime
        }
    }

`;

export const GET_QUIZ_BY_ID_without_Q = gql`
    mutation getQuizByIdMutation($QuizId: Int!){
        getQuizById(QuizId: $QuizId){
            id 
            createdBy
            title
            description
            isVisible
            isApproved
            startTime
            endTime
        }
    }

`;

export const GET_QUIZ_BY_ID_with_Q = gql`
    mutation getQuizByIdMutation($QuizId: Int!){
        getQuizById(QuizId: $QuizId){
            id 
            title
            questions {
                id
                quizId
                description
                options
                correctOption
            }
            isVisible
            isApproved
            startTime
            endTime
        }
    }

`;

export const UPDATE_QUIZ = gql`
    mutation updateQuizMutation($quizId: Int!, $Quiz: quizInput){
        updateQuiz(quizId: $quizId, Quiz: $Quiz){
            id 
        }
    }
`;

export const DELETE_QUIZ = gql`
    mutation deleteQuizMutation($QuizId:Int!){
        deleteQuiz(QuizId:$QuizId)
    }
`;

export const ADD_QUESTION_TO_QUIZ = gql`
    mutation addQuestionToQuizMutation($question: addQuestion){
        addQuestionToQuiz(question: $question){
            id 
            quizId
            description
            options
            correctOption
        }
    }
`;

export const CHANGE_APPROVE_STATUS_OF_QUIZ = gql`

    mutation changeApproveStatusOfQuizMutation($quizId:Int!){
        changeApproveStatusOfQuiz(quizId:$quizId){
            id 
            isApproved
        }
    }
`;
export const CHANGE_VISIBLE_STATUS_OF_QUIZ = gql`
    mutation changeVisibleStatusOfQuizMutation($quizId:Int!){
     changeVisibleStatusOfQuiz(quizId:$quizId){
            id 
            isVisible
        }   
    }
`;

export const SET_QUIZ_RESPONSE=gql`
    mutation setQuizResponseMutation($quizId:Int!,$response:[Int]){
        setResponse(quizId:$quizId,response:$response){
            score
            response
        }
    }
`;

export const QUIZ_RESPONSE=gql`
    mutation getQuizResponseForUserMutation($quizId:Int!,$userId:Int!){
        getQuizResponseForUser(quizId:$quizId,userId:$userId){
            score
            response
        }   
    }
`;
