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
export const GET_USER_FOR_PROFILE = gql`
    query GetUserStatus{
        getMe{
            id
            userInformation{
                name
                username
                email
                mobileNum
                gender
                role
                state
                college
                department
                course
                collegeId
                graduationYear
                cgpa
                hosteler
                profilePic 
                leetcodeProfile    
                codeforcesProfile  
                linkedinProfile    
                githubProfile      
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
