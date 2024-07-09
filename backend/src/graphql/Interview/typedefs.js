export const typeDefs = `#graphql

    type Interview {
        id : Int
        intervieweeId : Int
        interviewerId : Int
        startTime : DateTime
        duration : Int
        topics : [String]
        isCompleted : Boolean
        intervieweeName : String
        intervieweeEmail : String
        intervieweeUsername : String
        interviewerName : String
        interviewerEmail : String
        interviewerUsername : String
        feedback : Feedback
    }

    type Feedback {
        id : Int
        interviewId : Int
        communication : Int
        development : Int
        dsa : Int
        csfundamentals : Int
        notes : [String]
        points : Int
    }

    input InterviewInput {
        startTime : DateTime!
        duration : Int!
        topics : [String]
    }

    input InterviewOptional {
        intervieweeId : Int
        interviewerId : Int
    }

    input FeedbackInput {
        interviewId : Int!
        communication : Int!
        development : Int!
        dsa : Int!
        csfundamentals : Int!
        notes : [String]
    }
`
