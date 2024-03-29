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
                name
            }
            authentication{
                isVerified
                isBoarded   
            }
        }
    }
`;
export const GET_USER_STATUS_WITH_ALL_DETAILS = gql`
    query GetUserStatus{
        getMe{
            id
            userInformation{
             username
             name
             email
             mobileNum
             profilePic
             gender
             collegeId
             graduationYear
             cgpa
             college
             department
             course
             state
             hosteler
             leetcodeProfile
             codeforcesProfile
             linkedinProfile
             githubProfile

        }
            authentication{
                isVerified
                isBoarded   
            }
        }
    }
`;
