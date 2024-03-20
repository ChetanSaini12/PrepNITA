export const typedefs = `#graphql

    type Interview {
        id : Int
        intervieweeId : Int
        interviewerId : Int
        startTime : DateTime
        duration : Int
        topics : [String]
        isCompleted : Boolean
        intervieweeName : String
        interviewerName : String
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

    intput InterviewInput {
        startTime : DateTime!
        duration : Int!
        topics : [String]
    }

    input feedbackInput {
        interviewId : Int!
        communication : Int!
        development : Int!
        dsa : Int!
        csfundamentals : Int!
        notes : [String]
    }
`
