export const typeDefs = `#graphql

    type Experience {
        id : Int
        company : String
        role : String
        description : String
        anonymous : Boolean
        createdBy : Int
        creatorName : String
        creatorUsername : String
        createdAt : DateTime
        upvotes : Int
        downvotes : Int
    }

    input InputExperience {
        company : String
        role : String
        description : String
        anonymous : Boolean
    }

`
