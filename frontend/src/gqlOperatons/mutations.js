//mutations for the frontend
import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation createUserMutation($user: UserInput) {
    createUser(User: $user) {
      email
      firstName
      lastName
      mobileNum
      username
    }
  }
`;

export const LOGIN_USER=gql`
  mutation loginUserMutation($username:String,$email:String,$password:String!){
    loginUser(username: $username, email: $email, password: $password)
  }
`;


