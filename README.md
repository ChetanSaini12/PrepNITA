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
    * id: Int! - Auto-incremented unique identifier for each user.
    * email: String! - Unique email address of the user.
    * username: String! - Unique username of the user.
    * firstName: String! - First name of the user.
    * lastName: String - Last name of the user (optional).
    * password: String! - Password of the user.
    * mobileNum: String! - Mobile number of the user.
    * role: UserRole! - Role of the user.

* UserRole (enum) : {USER, ADMIN, SUPERADMIN, MANAGER}

* Question :
    * id: Int! - Auto-incremented unique identifier for each question.
    * title: String! - Title of the question.
    * description: String! - Description or body of the question.
    * answer: String - Answer to the question (optional).
    * postedBy: Int! - ID of the user who posted the question.
    * tags: [String]! - Array of tags associated with the question.
    * links: [QueAddOnLink] - Array of additional links related to the question.
    * isApproved: Boolean - Flag indicating whether the question is approved.
    * upvotes: Int - Number of upvotes for the question.
    * downvotes: Int - Number of downvotes for the question.

* QueAddOnLink :
    * id: Int! - Auto-incremented unique identifier for each additional link.
    * title: String! - Title of the additional link.
    * url: String! - URL of the additional link.
    * questionId: Int! - ID of the question associated with the link.



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


* **getQuestions:**
    * Description: Fetches all questions
    * Parameters: None
    * Headers : Authorization : None
    * Response:
        * Question

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


* **createQuestion(Question : QuestionInput) : Question :**
    * Description: create a question
    * Headers : Authorisation : ADMIN_JWT_TOKEN
    * Parameters:
        * QuestionInput
    * Response:
        * Question


