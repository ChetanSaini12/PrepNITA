//mutations for the frontend
import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation createUserMutation($email:String!,$password:String!){
    registerUser(email: $email,password: $password) {
      token
      user {
        id
        email
        username
        role
        authentication {
          isVerified
          isBoarded
        }
      }
    }
  }
`;


export const LOGIN_USER=gql`
  mutation loginUserMutation($username:String,$email:String,$password:String!){
    loginUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        email
        mobileNum
        username
        role
      }
    }
  }
`;

export const VERIFY_EMAIL=gql`
  mutation verifyEmailMutation($email:String!,$otp:String!){
    checkOTPForEmail(email: $email, otp: $otp) {
      token
     user{
      id
      email
      username
      role
      authentication {
        isVerified
        isBoarded
      }
     }
    }
  }
`;

