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
    * id: Int!
    * username: String!
    * email: String!
    * firstName: String!
    * lastName: String
    * mobileNum: Int!
    * username: String!
    * role: UserRole!

* UserRole (enum) : {USER, ADMIN, SUPER_ADMIN, MANAGER}

### Queries

* **getAllUser:**
    * Description: Fetches information for all users.
    * Parameters: None
    * Response:
        * id : Int!
        * email: String!
        * firstName: String!
        * lastName: String
        * mobileNum: Int!
        * username: String!
        * role : UserRole!


* **getMe:**
    * Description: Fetches information for cuurent users.
    * Parameters: None
    * Headers : Authorization : JWT_TOKEN
    * Response:
        * id : Int!
        * email: String!
        * firstName: String!
        * lastName: String
        * mobileNum: Int!
        * username: String!
        * role : UserRole!

### Mutations

* **createUser:**
    * Description: Creates a new user.
    * Parameters:
        * user: User
    * Response:
        * id : Int!
        * email: String!
        * firstName: String!
        * lastName: String
        * mobileNum: Int!
        * username: String!
        * role : UserRole!


* **loginUser:**
    * Description: login a new user.
    * Parameters:
        * email : String, username: String, password: String!
    * Response:
        * token : String

* **getUserById:**
    * Description: get a user from id
    * Parameters:
        * id: Int!
    * Response:
        * id : Int!
        * email: String!
        * firstName: String!
        * lastName: String
        * mobileNum: Int!
        * username: String!
        * role : UserRole!


* **updateUserRole:**
    * Description: update role of a user from id
    * Parameters:
        * id: Int!, role : UserRole!
    * Response:
        * role : UserRole!


