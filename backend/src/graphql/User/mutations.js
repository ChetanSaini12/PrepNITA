export const mutations = `#graphql

    registerUser(email: String!, password: String!) : UserWithJWT

    sendVerifyMail(email: String!) : String

    checkOTPForEmail(email: String!, otp: String!) : UserWithJWT

    onboardUser(user : UserInput) : User
    
    updateUserRole(id : Int!, role : UserRole!) : String
    
    getUserById(id : Int!) : User
`
    
    // createUser(User: UserInput) : UserWithJWT

    // loginUser(username : String, email : String, password : String!) : UserWithJWT