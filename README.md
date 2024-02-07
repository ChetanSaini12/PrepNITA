# MindSet

## Table of Contents

* **API Documentation**
    * Technologies
    * Endpoints
    * Types
    * Queries
    * Mutations
    * Authentication
    * Error Handling

## API Documentation

### Technologies

* GraphQL - Data query language for efficient data fetching

### Endpoints

* URL for your GraphQL endpoint

### Types

* User :
    * username: String!
    * email: String!
    * firstName: String!
    * lastName: String
    * mobileNum: Int!
    * username: String!

### Queries

* **getAllUser:**
    * Description: Fetches information for all users.
    * Parameters: None
    * Response:
        * email: String!
        * firstName: String!
        * lastName: String
        * mobileNum: Int!
        * username: String!

### Mutations

* **createUser:**
    * Description: Creates a new user.
    * Parameters:
        * user: User
    * Response:
        * email: String!
        * firstName: String!
        * lastName: String
        * mobileNum: Int!
        * username: String!
