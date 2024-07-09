export const typeDefs = `#graphql

    type Question {
        id : Int
        description : String
        answer : String
        createdBy : Int
        tags : [String]
        links : [QueAddOnLink]
        isApproved : Boolean
        isVisible : Boolean
        creatorUsername : String
        creatorName : String
        upvotes : Int
        downvotes : Int
        isLiked  : Boolean
        isDisliked  : Boolean
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

    input QuestionOptional {
        title: String
        tags: [String]
    }
`