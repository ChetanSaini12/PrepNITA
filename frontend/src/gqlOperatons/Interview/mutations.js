import { gql } from '@apollo/client';

export const CREATE_INTERVIEW = gql`
    mutation createInterviewMutation($Interview: InterviewInput!) {
        createInterview(Interview: $Interview) {
            id
            intervieweeId
            interviewerId
            startTime
            duration
            topics
            isCompleted
            intervieweeName
            interviewerName
            feedback {
                id
                interviewId
                communication
                development
                dsa
                csfundamentals
                notes
                points
            }
        }

    }

`;

export const UPDATE_INTERVIEW = gql`
    mutation updateInterviewMutation($interviewId:Int!){
        updateInterview(interviewId :$interviewId){
    
                id
                intervieweeId
                interviewerId
                startTime
                duration
                topics
                isCompleted
                intervieweeName
                interviewerName
                feedback {
                    id
                    interviewId
                    communication
                    development
                    dsa
                    csfundamentals
                    notes
                    points
                }
            }

    }
`;

export const DELETE_INTERVIEW=gql`
    mutation deleteMutation($interviewId: Int!){
        deleteInterview(interviewId: $interviewId){
            string
        }
    }
`;

export const ASSIGN_INTERVIEW=gql`
    mutation assignInterviewMutation($interviewId:Int!){
        assignInterview(interviewId : $interviewId){
            id
            intervieweeId
            interviewerId
            startTime
            duration
            topics
            isCompleted
            intervieweeName
            interviewerName
            feedback {
                id
                interviewId
                communication
                development
                dsa
                csfundamentals
                notes
                points
            }
        }
    }

`;

export const GIVE_FEEDBACK=gql`
    mutation giveFeedbackMutation($Feedback:FeedbackInput!){
        giveFeedback(Feedback : $Feedback){
            id
            interviewId
            communication
            development
            dsa
            csfundamentals
            notes
            points
        }
    }

`;

export const REVOKE_INTERVIEW=gql`
    mutation revokeInterviewMutation($Interview: InterviewInput!){
        revokeInterview(Interview : $Interview){
            id
            intervieweeId
            interviewerId
            startTime
            duration
            topics
            isCompleted
            intervieweeName
            interviewerName
            feedback {
                id
                interviewId
                communication
                development
                dsa
                csfundamentals
                notes
                points
            }
        }
    }

`;
