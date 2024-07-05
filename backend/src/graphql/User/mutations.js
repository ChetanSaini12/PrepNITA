export const mutations = `#graphql

    registerUser(email: String!, password: String!) : UserWithJWT

    sendVerifyMail(email: String!) : String

    checkOTPForEmail(email: String!, otp: String!) : UserWithJWT

    onboardUser(user : UserInput) : User

    updateUserProfile(user: UserInputOptional) : User
    
    updateUserRole(id : Int!, role : UserRole!) : String
    
    getUserById(id : Int!) : User

    getAllUser(user : UserInputOptional) : [User]

    profilePicUpload(file: Upload!): String!
`
    
    // createUser(User: UserInput) : UserWithJWT

    // loginUser(username : String, email : String, password : String!) : UserWithJWT