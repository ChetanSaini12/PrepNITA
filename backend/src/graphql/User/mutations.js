export const mutations = `#graphql

    regiserUser(email: String!, password: String!) : UserWithJWT

    sendVerifyMail(email: String!) : String

    checkOTPForEmail(email: String!, otp: String!) : UserWithJWT
    
    updateUserRole(id : Int!, role : UserRole!) : String
    
    getUserById(id : Int!) : User
`
    
    // createUser(User: UserInput) : UserWithJWT

    // loginUser(username : String, email : String, password : String!) : UserWithJWT