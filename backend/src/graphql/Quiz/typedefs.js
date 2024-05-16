export const typedefs = `#graphql
    type Quiz {
        id : Int
        createdBy : Int
        title : String
        description : String
        questions : [QuizQuestion]
        isVisible : Boolean
        startTime : DateTime
        endTime : DateTime
        QuizAttendees : [QuizAttendees]
    }

    type QuizQuestion {
        id  : Int
        quizId : Int
        description : String
        options : [String]
        correctOption : Int
    }

    type QuizAttendees {
        id : Int
        quizId : Int
        userId : Int
        score : Int
    }

    input quizInput {
        title : String!
        description : String!
        startTime : DateTime!
        endTime : DateTime!
    }

    input addQuestion {
        quizId : Int!
        description : String!
        options : [String]!
        correctOption : Int!
    }
`