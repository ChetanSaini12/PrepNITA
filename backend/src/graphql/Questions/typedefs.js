export const typeDefs = `#graphql

    type Question {
        id : Int
        title : String
        description : String
        answer : String
        postedBy : Int
        tags : [String]
        links : [QueAddOnLink]
        isApproved : Boolean
        upvotes : Int
        downvotes : Int
    }

    type QueAddOnLink {
        id : Int
        title : String
        url : String
        questionId : Int
    }

    input QuestionInput {
        title : String!
        description : String!
        answer : String!
        tags : [String]
        links : [QueAddOnLinkInput]
    }

    input QueAddOnLinkInput {
        title : String!
        url : String!
    }
`