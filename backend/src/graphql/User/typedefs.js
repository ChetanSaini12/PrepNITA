export const typeDefs = `#graphql
    type User {
        id: Int!
        username: String!
        firstName: String!
        lastName: String
        email: String!
        mobileNum: String!
        role : UserRole!
    }

    enum UserRole {
        USER
        ADMIN
        SUPER_ADMIN
        MANAGER
    }

    type Address {
        street: String!
        city: String!
        state: String!
        zip: String!
        country: String!
    }

    input UserInput {
        firstName: String!
        lastName: String
        email: String!
        mobileNum: String!
        password: String!
        username: String!
    }

    input AddressInput {
        street: String!
        city: String!
        state: String!
        zip: String!
        country: String!
    }

`
