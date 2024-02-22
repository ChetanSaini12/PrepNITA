import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OAuth from "../Components/OAuth";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../gqlOperatons/mutations";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, setLoading } from "../app/user/userSlice";
import { VerifyToken } from "../utils/verifyToken";
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';

function Onboarding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const { loggedIn, isLoading } = useSelector((state) => state.user);

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
  },[]); // Added dependencies for useEffect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [signUpUser] = useMutation(REGISTER_USER, {
    onError: (mutationError) => {
      console.log("Error in signUpUser mutation:", mutationError.message);
      dispatch(setLoading(false));
      return setError(mutationError.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(false));
    const { username, password, email, firstName, lastName, mobileNum } = formData;

    if (!username || !firstName || !email || !password || !mobileNum) {
      dispatch(setLoading(false));
      return setError("Please Fillout All The Fields");
    }


    signUpUser({
      variables: {
        user: {
          username,
          password,
          email,
          firstName,
          lastName,
          mobileNum,
        },
      },
    })
      .then((user) => {
        console.log("signUp user form backend :", user);
        // Handle success or navigation here
        if (!user || !user.data) {
          dispatch(setLoading(false));
          return setError(user.errors.message || "Internal Server Error");
        }

        const { id, email, firstName, lastName, mobileNum, username, role } = user.data.createUser;
        dispatch(LoginUser({
          id, email, firstName, lastName, mobileNum, username, role
        }));
        // localStorage.se
        dispatch(setLoading(false));
        return navigate("/");
      })
      .catch((catchError) => {
        console.log("Error in signUpUser catch block:", catchError);
        dispatch(setLoading(false));
        return setError(catchError);
      });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    
};


  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
          <div className='w-0 justify-items-start'>
                <Lottie 
            options={defaultOptions}
            height={100}
            width={100}
        />
                </div>
            <span className="px-2 py-1 bg-gradient-to-r from from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white">
              PreP
            </span>
            NITA
          </Link>
          <p className="text-sm mt-5 ">
            This is a demo project. You can Sign Up with your email and
            password. Or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username"></Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="First Name"></Label>
              <TextInput
                type="text"
                placeholder="John"
                id="firstName"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Last Name"></Label>
              <TextInput
                type="text"
                placeholder="Doe"
                id="lastName"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Your Mobile Number"></Label>
              <TextInput
                type="text"
                placeholder="+91-0000000000"
                id="mobileNum"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm"></Spinner>
                  <span>Loading...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
            <OAuth></OAuth>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already Have an Account ?</span>
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )

};

export default Onboarding;
