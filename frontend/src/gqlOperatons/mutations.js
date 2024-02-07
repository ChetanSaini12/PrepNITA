//mutations for the frontend
import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
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
`;

export const TEMP_MUT = gql`
    mutation tempMutation($tempVal: String) {
        tempMut(tempVal: $tempVal)
    }  
`;
