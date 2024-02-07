//mutations for the frontend
import {gql} from "@apollo/client"

const REGISTER_USER = gql`
    mutation createUserMutation($user: UserInput) {
        createUser(User: $user) {
            email
            firstName
            lastName
            mobileNum
            password
            username
        }
    }
`
