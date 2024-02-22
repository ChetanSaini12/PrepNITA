import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OAuth from "../Components/OAuth";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL } from "../gqlOperatons/mutations";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, setLoading } from "../app/user/userSlice";
import { VerifyToken } from "../utils/verifyToken";
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';

function VerifyEmail() {
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
    }, []); // Added dependencies for useEffect

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const [verifyOtp] = useMutation(VERIFY_EMAIL, {
        onError: (mutationError) => {
            console.log("Error in verifyEmail mutation:", mutationError.message);
            dispatch(setLoading(false));
            return setError(mutationError.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setLoading(false));
        const { otp, email } = formData;

        if (!email || !otp) {
            dispatch(setLoading(false));
            return setError("Please Fillout All The Fields");
        }


        verifyOtp({
            variables: {
                email,
                otp,
            },
        })
            .then((user) => {
                // const token = response.data.loginUser.token;
                // localStorage.setItem("token", token);
                // console.log("token for login ", token);
                // const { id, role } = response.data.loginUser.user;
                console.log("res of verifyEMail  form backend :", user.data);
                // Handle success or navigation here
                if (!user || !user.data) {
                    dispatch(setLoading(false));
                    return setError(user.errors.message || "Internal Server Error");
                }

                const { isVerified, isBoarded } = user.data.registerUser.user.authentication;
                if (!isVerified) {
                    dispatch(setLoading(false));
                    return setError("Email not verified!!");
                };
                if (!isBoarded) {
                    dispatch(setLoading(false));
                    return navigate('/onboarding');
                };

                // const {id,username,role}= user.data.createUser;

                // dispatch(LoginUser({
                //   id, email,username, role
                // }));
                // // localStorage.se
                // dispatch(setLoading(false));
                // return navigate("/");
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

                {/* ................................FORM................................................... */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/* <div>
              <Label value="Your Username"></Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              ></TextInput>
            </div> */}
                        {/* <div>
              <Label value="First Name"></Label>
              <TextInput
                type="text"
                placeholder="John"
                id="firstName"
                onChange={handleChange}
              ></TextInput>
            </div> */}
                        {/* <div>
              <Label value="Last Name"></Label>
              <TextInput
                type="text"
                placeholder="Doe"
                id="lastName"
                onChange={handleChange}
              ></TextInput>
            </div> */}
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
              <Label value="Otp"></Label>
              <TextInput
                type="text"
                placeholder="123456"
                id="otp"
                onChange={handleChange}
              ></TextInput>
            </div>
                        {/* <div>
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div> */}
                        <Button
                            gradientDuoTone="purpleToPink"
                            type="Verify Otp "
                            disabled={isLoading}
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
                    </form>
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

export default VerifyEmail;
