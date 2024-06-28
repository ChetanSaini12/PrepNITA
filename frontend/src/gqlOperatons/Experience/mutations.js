import { gql } from '@apollo/client';

// export const CREATE_EXPERIENCE = gql``;

export const GET_ALL_EXPERIENCE = gql`
    mutation getAllExperienceMutaiton{
        getAllExperience{
            id
            company
            role
            anonymous
            creatorUsername
        }
    }
`;

export const GET_EXPERIENCE_BY_ID = gql`
    mutation getExperienceByIdMutation($experienceId : Int!){
        getExperienceById(experienceId : $experienceId){
            id
            company
            role
            description
            anonymous
            createdBy
            creatorName
            creatorUsername
            createdAt
            comments{
                id
                experienceId
                description
                reply{
                    id
                    expcommentId
                    description
                    replierId
                    replierUserName
                    likes
                }
                commentorId
                commentorUserName
                likes
            }
            upvotes
            downvotes
        }
    }
`;