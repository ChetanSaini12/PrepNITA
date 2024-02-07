//queries for Frontend to get data from backend
import {gql} from '@apollo/client'

export const ALL_USER = gql`
    query AllUser {
        getAllUser {
            username
            firstName
            lastName
            email
            mobileNum
            password
        }
    }  
`