//queries for Frontend to get data from backend
import { gql } from '@apollo/client'

export const ALL_USER = gql`
    query AllUser {
        getAllUser {
            id
            username
            firstName
            lastName
            email
            mobileNum
            role
        }
    }  
`
export const GET_USER_STATUS = gql`
    query GetUserStatus{
        getMe{
            id
            email
            firstName
            lastName
            mobileNum
            username
            role
        }
    }
`;
