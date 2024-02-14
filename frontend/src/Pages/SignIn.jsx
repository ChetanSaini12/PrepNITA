import { Button, Label, TextInput } from 'flowbite-react'
import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { Alert } from 'flowbite-react'
import OAuth from '../Components/OAuth'
import { Loader } from './Loader'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../gqlOperatons/mutations';

import { useDispatch, useSelector } from "react-redux";
import { LoginUser, setLoading } from '../app/user/userSlice'
import { VerifyToken } from '../utils/verifyToken'


function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);


  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await VerifyToken(dispatch);
        if (response.verified) {
          dispatch(setLoading(false));
          navigate('/');
        }

      } catch (error) {
        console.log("Error in Auth try catch:", error.message);
        dispatch(setLoading(false));
      }
    };

    checkToken();
  }, []); // Added dependencies for useEffect


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const [loginUser] = useMutation(LOGIN_USER, {
    onError: (mutationError) => {
      console.log("onError in LOGIN_USER ", mutationError.message);
      return setError(mutationError.message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user details for login from Client Side  : ", formData);
    const { username, password } = formData;
    if (!username || !password) {
      return setError("Please Fillout All The Fields");
    }
    try {
      const response = await loginUser({
        variables: {
          username,
          password,
        }
      });
      console.log("Response from backend for loginUser  ", response);

      if (!response || !response.data) {
        return setError(response.errors.message || "Internal Server Error");
      }
      const token = response.data.loginUser.token;
      localStorage.setItem("token", token);
      console.log("token for login ", token);
      const { id, role } = response.data.loginUser.user;
      dispatch(LoginUser({
        id,
        username,
        role,
      }));
      return navigate('/');
    } catch (err) {
      console.log("try catch block error in signIn page  : ", err);
      return setError(err);
    }

  };

  if (isLoading) return <Loader />;
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white'>MindSet</span>
          </Link>
          <p className='text-sm mt-5 '>
            This is a demo project. You can Sign Up with your email and password.
            Or with Google.
          </p>
        </div>
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <Label value='Your userName' >
              </Label>
              <TextInput type='text' placeholder='name_company123' id="username" onChange={handleChange}></TextInput>
            </div>
            <div>
              <Label value='Your Password' >
              </Label>
              <TextInput type='password' placeholder='Password' id="password" onChange={handleChange}></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit'>
              SignIn
            </Button>
            <OAuth></OAuth>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an Account ?</span>
            <Link to={'/register'} className='text-blue-500'>SignUp</Link>
          </div>
          {
            error && (
              <Alert className='mt-5' color="failure">
                {error}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn