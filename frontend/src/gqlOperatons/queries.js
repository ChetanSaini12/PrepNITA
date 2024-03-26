//queries for Frontend to get data from backend
import { gql } from '@apollo/client'


export const GET_USER_STATUS = gql`
    query GetUserStatus{
        getMe{
            id
            userInformation{
                email
                mobileNum
                username
                role
                profilePic
            }
            authentication{
                isVerified
                isBoarded   
            }
        }
    }
`;
