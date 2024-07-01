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
        isLiked  : Boolean
        isDisliked  : Boolean
    }

    type ExpComment {
        id : Int 
        experienceId :  Int
        description  : String
        reply        :  [ExpReply]
        commentorId  : Int
        commentorUserName : String
        likes    : Int
        isLiked  : Boolean
        isDisliked  : Boolean
    }

    type ExpReply {
        id            : Int
        expcommentId  : Int
        description   : String
        replierId     : Int
        replierUserName : String
        likes         : Int
        isLiked  : Boolean
        isDisliked  : Boolean 
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
