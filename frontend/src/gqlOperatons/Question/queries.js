import { gql } from '@apollo/client';

export const GET_ALL_QUESTIONS = gql`
    query getAllQuestions{
        getQuestions{
            id 
            title
            description
            answer
            postedBy 
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

export const GET_TEMP_QUE = gql`
    query tempQueQr{
        tempQueQr{
            question
        }
    }

`;