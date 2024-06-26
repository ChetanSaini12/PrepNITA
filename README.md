# PrepNITA

## Table of Contents

- **API Documentation**
  - Technologies
  - Endpoints
  - Types
  - Queries
  - Mutations
  - Authentication
  - Error Handling

## API Documentation

### Technologies

- GraphQL - Data query language for efficient data fetching

### Endpoints

- URL for your GraphQL endpoint

### Types

##### USER :-

- User :

  - id : Int - Auto-incremented unique identifier for each user.
  - email : String - Unique email address of the user.
  - username : String - Unique username of the user.
  - firstName : String - First name of the user.
  - lastName : String - Last name of the user.
  - password : String - Password of the user.
  - mobileNum : String - Mobile number of the user.
  - role : UserRole - Role of the user.

- UserRole (enum) : {USER, ADMIN, SUPERADMIN, MANAGER}

- UserWithJWT :

  - token : String - JWT token associated with the user.
  - user : User - Information about the user.

##### QUESTION :-

- Question :

  - id : Int - Auto-incremented unique identifier for each question.
  - title : String - Title of the question.
  - description : String - Description or body of the question.
  - answer : String - Answer to the question.
  - postedBy : Int - ID of the user who posted the question.
  - tags : [String] - Array of tags associated with the question.
  - links : [QueAddOnLink] - Array of additional links related to the question.
  - isApproved : Boolean - Flag indicating whether the question is approved.
  - upvotes : Int - Number of upvotes for the question.
  - downvotes : Int - Number of downvotes for the question.

- QueAddOnLink :

  - id : Int - Auto-incremented unique identifier for each additional link.
  - title : String - Title of the additional link.
  - url : String - URL of the additional link.
  - questionId : Int - ID of the question associated with the link.

### Input Types :

##### User :-

- UserInput :

  - firstName : String! - First name of the user. (Required)
  - lastName : String - Last name of the user. (Optional)
  - email : String! - Unique email address of the user. (Required)
  - mobileNum : String! - Mobile number of the user. (Required)
  - password : String! - Password of the user. (Required)
  - username : String! - Unique username of the user. (Required)

##### Question :-

- QuestionInput :

  - title : String! - Title of the question. (Required)
  - description : String! - Description or body of the question. (Required)
  - answer : String! - Answer to the question. (Required)
  - tags : [String] - Array of tags associated with the question. (Optional)
  - links : [QueAddOnLinkInput] - Array of additional links related to the question. (Optional)

- QueAddOnLinkInput :

  - title : String! - Title of the additional link. (Required)
  - url : String! - URL of the additional link. (Required)

### Queries

##### User :-

- **getAllUser :**

  - Description : Fetches information for all users.
  - Parameters : None
  - Headers : Authorization : None
  - Response : [User] - Array of User objects

- **getMe :**

  - Description : Fetches information for current users.
  - Parameters : None
  - Headers : Authorization : token - (User JWT Token)
  - Response : User - A User Object representing the current user

##### Questions :-

- **getQuestions :**

  - Description : Fetches all questions
  - Parameters : None
  - Headers : Authorization : None
  - Response : [Question] - Array of Question objects

### Mutations

##### User :-

- **createUser(User: UserInput) : UserWithJWT**

  - Description : Creates a new user.
  - Headers : Authorization : None
  - Parameters :
    - user : UserInput
  - Response : UserWithJWT - JWT Token and A User Object representing the created user

- **loginUser(username : String, email : String, password : String!) : UserWithJWT**

  - Description : login a new user.
  - Headers : Authorization : None
  - Parameters :
    - email : String, username : String, password : String!
  - Response : UserWithJwt - JWT Token and A User Object representing the loggedIn user

- **getUserById(id : Int!) : User**

  - Description : get a user from id
  - Headers : Authorization : None
  - Parameters :
    - id : Int!
  - Response : User - User of Given ID

- **updateUserRole(id : Int!, role : UserRole!) : String**

  - Description : update role of a user from id
  - Headers : Authorization : Token - (Manager JWT Token)
  - Parameters :
    - id : Int!, role : UserRole!
  - Response :
    - role : UserRole

##### Question :-

- **createQuestion(Question : QuestionInput) : Question**

  - Description : create a question
  - Headers : Authorisation : Token - (User JWT Token)
  - Parameters : QuestionInput
  - Response : Question - Created Question Object

- **getQuestionById(QuestionId : Int!) : Question**

  - Description : get a question by id
  - Headers : Authorisation : Token - (User JWT Token)
  - Parameters : QuestionId : Int!
  - Response : Question - Question of given id

- **upVoteQuestion(QuestionId : Int!) : Question**

  - Description: Upvotes a specific question by ID.
  - Headers: Authorisation : Token - (User JWT Token)
  - Parameters: QuestionId : Int!
  - Response: Question - Updated Question object with the new upvote count.

- **downVoteQuestion(QuestionId : Int!) : Question**

  - Description: Downvotes a specific question by ID.
  - Headers: Authorisation : Token - (User JWT Token)
  - Parameters: QuestionId : Int!
  - Response: Question - Updated Question object with the new downvote count.

- **changeApproveStatusOfQue(QuestionId : Int!) : Question**

  - Description: Changes the approval status of a question by ID.
  - Headers: Authorisation : Token - (Admin JWT Token)
  - Parameters: QuestionId : Int!
  - Response: Question - Updated Question object with the new approval status. (true <-> false)

- **deleteQuestion(QuestionId : Int!) : String**

  - Description: Deletes a specific question by ID.
  - Headers: Authorisation : Token - (Admin JWT Token or User JWT Token of the Question Creator)
  - Parameters: QuestionId : Int!
  - Response: String message - "Question deleted successfully with Question Title : \_\_\_".

- **updateQuestion(QuestionId : Int!, Question : QuestionInput) : Question**

  - Description: Updates a specific question by ID.
  - Headers: Authorisation : Token - (User JWT Token of the Question Creator)
  - Parameters: QuestionId : Int!, Question : QuestionInput - object containing updated details.
  - Response: Question - Updated Question object with the new details.



/** FRONTEND PAGES ***/

** User :- 
1. SignIn
2. SignUp
3. Onboarding
4. Profile Page
5. All Students