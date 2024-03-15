export const typeDefs = `#graphql

    type Question {
        id : Int
        description : String
        answer : String
        createdBy : Int
        tags : [String]
        links : [QueAddOnLink]
        isApproved : Boolean
        isVisibile : Boolean
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