import { gql } from '@apollo/client';

export const GET_TEMP_QUE = gql`
    query tempQueQr{
        tempQueQr{
            question
        }
    }

`;