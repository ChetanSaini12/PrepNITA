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

export const GET_QUIZ_BY_ID = gql`
    mutation getQuizByIdMutation($QuizId: Int!){
        getQuizById(QuizId: $QuizId){
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
