export const typeDefs = `#graphql

    type Experience {
        id : Int
        company : String
        role : String
        description : String
        createdBy : Int
        createdAt : DateTime
        upvotes : Int
        downvotes : Int
    }

    type InputExperience {
        company : String!
        role : String!
        description : String!
    }

`
