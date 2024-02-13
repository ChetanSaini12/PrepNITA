export const mutations = `#graphql
    createUser(User: UserInput) : UserWithJWT

    loginUser(username : String, email : String, password : String!) : UserWithJWT

    updateUserRole(id : Int!, role : UserRole!) : String

    getUserById(id : Int!) : User
`
