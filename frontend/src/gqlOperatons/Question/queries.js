import { gql } from '@apollo/client';

export const GET_ALL_QUESTIONS = gql`
    query getAllQuestions{
        getQuestions{
        id 
        

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