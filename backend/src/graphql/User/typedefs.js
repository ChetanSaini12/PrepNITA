export const typeDefs = `#graphql
    type User {
        username: String!
        firstName: String!
        lastName: String
        email: String!
        mobileNum: String!
        password: String!
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