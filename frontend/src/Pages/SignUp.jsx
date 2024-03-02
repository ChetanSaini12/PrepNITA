import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OAuth from "../Components/OAuth";
import { useMutation } from "@apollo/client";
import { REGISTER_USER, SEND_VERIFY_EMAIL, VERIFY_EMAIL } from "../gqlOperatons/mutations";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, setLoading } from "../app/user/userSlice";
import { VerifyToken } from "../utils/verifyToken";
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const [emailModel, setEmailModel] = useState(false);

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
        toast.error(error.message, { duration: 4000 });
        dispatch(setLoading(false));
      }
    };

    checkToken();
  }, []); // Added dependencies for useEffect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [signUpUser] = useMutation(REGISTER_USER, {
    onError: (mutationError) => {
      console.log("Error in signUpUser mutation 1:", mutationError.message);
      dispatch(setLoading(false));
     return toast.error(mutationError.message, { duration: 4000 });
      // return setError(mutationError.message);
    },
  });

  const [verifyOtp] = useMutation(VERIFY_EMAIL, {
    onError: (mutationError) => {
      console.log("Error in signUpUser mutation 2:", mutationError.message);
      dispatch(setLoading(false));
      return toast.error(mutationError.message, { duration: 4000 });
      // return setError(mutationError.message);
    },
  });

  const [sendVerifyEmail] = useMutation(SEND_VERIFY_EMAIL, {
    onError: (mutationError) => {
      console.log("Error in signUpUser mutation 3:", mutationError.message);
      dispatch(setLoading(false));
     return toast.error(mutationError.message, { duration: 4000 });
      // return setError(mutationError.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const { password, email } = formData;

    if (!email || !password) {
      dispatch(setLoading(false));
     return toast.error("Please Fillout All The Fields", { duration: 4000 });
      // return setError("Please Fillout All The Fields");
    }
    try {
      const user = await signUpUser({
        variables: {
          email,
          password,
        },
      });
      // const token = response.data.loginUser.token;
      // localStorage.setItem("token", token);
      // console.log("token for login ", token);
      // const { id, role } = response.data.loginUser.user;
      console.log("signUp user form backend :", user);
      // Handle success or navigation here
      if (!user || !user.data || !user.data.registerUser) {
        dispatch(setLoading(false));
        console.log("user not found ");
        return toast.error(user.errors.message || "Internal Server Error", { duration: 4000 });
        // return setError(user.errors.message || "Internal Server Error");
      }

      const { isVerified, isBoarded } = user.data.registerUser.user.authentication;
      if (!isVerified) {
        console.log("email : ", email);
        sendVerifyEmail({
          variables: {
            email
          }
        }).then((response) => {
          if (!response || !response.data || !response.data.sendVerifyMail) {
            dispatch(setLoading(false));
            return toast.error(response.errors.message || "Email not sent! Please try again later.", { duration: 4000 });
            // return setError(response.errors.message || "Email not sent! Please try again later.");
          }
          else {
            dispatch(setLoading(false));
            toast.success(response.data.sendVerifyMail + " Please verify your email", { duration: 4000 });
            // setError(response.data.sendVerifyMail + " Please verify your email");
            return setEmailModel(true);
          }
        })
          .catch((catchError) => {
            dispatch(setLoading(false));
            console.log("Error in sendVerifyEmail catch block: *111 ", catchError);
            return toast.error(catchError.message||catchError, { duration: 4000 });;
            // return setError(catchError);
          });
      }
      else if (!isBoarded) {
        const { id, username, role } = user.data.registerUser.user;
        console.log("User not onboarded! Please onboard your account");
        localStorage.setItem("token", user.data.registerUser.token);
        dispatch(LoginUser({
          id, email, username, role
        }));
        // localStorage.se
        dispatch(setLoading(false));
        return navigate('/onboarding');
      }
      else {

        const { id, username, role } = user.data.registerUser;

        dispatch(LoginUser({
          id, email, username, role
        }));
        // localStorage.se
        dispatch(setLoading(false));
        return navigate("/");
      }
    } catch (catchError) {
      console.log("Error in signUpUser catch block:", catchError);
      dispatch(setLoading(false));
      return toast.error(catchError.message||catchError, { duration: 4000 });
      // return setError(catchError);
    };
  };

  const handleOtpModel = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const { otp, email } = formData;

    if (!email || !otp) {
      dispatch(setLoading(false));
      return toast.error("Please Fillout All The Fields", { duration: 4000 });
      // return setError("Please Fillout All The Fields");
    }

    try {
      const user = await verifyOtp({
        variables: {
          email,
          otp,
        },
      });

      console.log("res of verifyEMail  form backend :", user.data);
      if (!user || !user.data || !user.data.checkOTPForEmail) {
        dispatch(setLoading(false));
        console.log("user not found ");
        return toast.error(user.errors.message || "Internal Server Error", { duration: 4000 });
        // return setError(user.errors.message || "Internal Server Error");
      }
      else {
        dispatch(setLoading(false));
        toast.success("Email Verified Successfully ! You can Login Now ", { duration: 4000 });
        // setError("Email Verified Successfully ! You can Login Now ");
        return setEmailModel(false);
      }
    } catch (catchError) {
      console.log("Error in signUpUser catch block:", catchError);
      dispatch(setLoading(false));
      return toast.error(catchError.message||catchError, { duration: 4000 });
      // return setError(catchError);
    };
  };

  const handleEmailModel = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const { email } = formData;
    if (!email) {
      dispatch(setLoading(false));
      return toast.error("Please Fillout All The Fields", { duration: 4000 });
      // return setError("Please Fillout All The Fields")
    }
    else {
      sendVerifyEmail({
        variables: {
          email
        }
      }).then((response) => {
        console.log("Response from sendVerifyEmail :", response.data);
        dispatch(setLoading(false));
        if (!response.data || !response.data.sendVerifyMail)
        return toast.error(response.errors.message || "Email not sent! Please try again later.", { duration: 4000 });
          // return setError(response.errors.message || "Email not sent! Please try again later.");
        else
          return toast.success(response.data.sendVerifyMail, { duration: 4000 });
          // return setError(response.data.sendVerifyMail);

      }).catch((catchError) => {
        console.log("Error in sendVerifyEmail catch block:", catchError);
        dispatch(setLoading(false));
        return toast.error(catchError.message||catchError, { duration: 4000 }); 
        // return setError(catchError);
      });
    };
  };


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

  };


  if (isLoading) return <Loader />
  else if (emailModel) return (
    // <div className="min-h-screen mt-20 "></div>
    <div className="min-h-screen flex p-3 max-w-2xl mx-auto items-center justify-center gap-5">
      <div className="flex-1 flex-col shadow-lg shadow-black p-10 pt-20 -mt-20">
        <h1 className="flex items-center justify-center mb-10 font-bold text-2xl" >Enter Your Email for OTP </h1>
        <form className="flex flex-col gap-4" onSubmit={handleOtpModel}>
          <div className="">
            <Label value="Your Email"></Label>
            <TextInput
              required
              type="email"
              placeholder="name@gmail.com"
              id="email"
              onChange={handleChange}
              className="min-w-2xl mx-auto items-center justify-center gap-5"
            ></TextInput>
          </div>
          <div className="">
            {/* <Label value="Your Email"></Label> */}
            <TextInput
              required
              type="text"
              placeholder="Please Enter OTP Here "
              id="otp"
              onChange={handleChange}
              className="min-w-2xl mx-auto items-center justify-center gap-5"
            ></TextInput>
            <Button className="mt-2" onClick={handleEmailModel}>
              Resend Otp
            </Button>
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
              "Verify Email"
            )}
          </Button>
        </form>
        <div className="flex items-center justify-center text-md mt-5">
          <button className="bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => { setEmailModel(false); setError(null) }}>
            Back
          </button>
        </div>
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  )
  else return (
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
        {/* ................................FORM................................................... */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              outline
            >
              {isLoading ? (
                <>
                  <Spinner size="sm"></Spinner>
                  <span>Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <OAuth></OAuth>
            <Button gradientMonochrome='cyan' onClick={() => { setEmailModel(true) }} outline>
              {/* <Link to={"/onBoarding"} className="text-blue-500"> */}
              <FaEnvelope className='w-6 h-5 mr-2' />Verify Email
              {/* </Link> */}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 text-blue-700">
            <button>
              {/* <Link to={"/onBoarding"} className="text-blue-500"> */}
              Forgot Password ?
              {/* </Link> */}
            </button>
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

export default SignUp;
