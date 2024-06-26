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
        comments : [ExpComment]
        upvotes : Int
        downvotes : Int
    }

    type ExpComment {
        id : Int 
        experienceId :  Int
        description  : String
        reply        :  [ExpReply]
        commentorId  : Int
        commentorUserName : String
        likes    : Int
    }

    type ExpReply {
        id            : Int
        expcommentId  : Int
        description   : String
        replierId     : Int
        replierUserName : String
        likes         : Int 
    }

    input InputExperience {
        company : String
        role : String
        description : String
        anonymous : Boolean
    }

    input InputExpComment {
        description : String
        experienceId : Int
    }

    input InputExpReply {
        description : String
        expcommentId : Int
    }

`
