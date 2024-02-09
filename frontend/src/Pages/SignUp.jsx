import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import OAuth from "../Components/OAuth";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../gqlOperatons/mutations";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signUpUser, { loading: _loading, data, error: _error }] = useMutation(REGISTER_USER)

  if (_loading) return <h1> yha loading hai .. </h1>
  if (data) {
    console.log("user : ", data);
    return <h1>user registered</h1>
  }
  if (_error) {
    console.log(" error yha hai  : ", _error);
    setError(_error);
    return <h1>Error hai bhai </h1>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, email, firstName, lastName, mobileNum } = formData;
    console.log("mobileNum : ", mobileNum);
    console.log(typeof(mobileNum));
    if (!username || !firstName || !email || !password || !mobileNum) {
      return setError(`Please Fillout All Fields`);
    }

    try {
      signUpUser({
        variables: {
          user: {
            username, password, email, firstName, lastName, mobileNum
          }
        },
      });
      /* 
      if (data.success === false) {
        return setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
      }
      */
      //  navigate("/login");
    } catch (error) {
      console.log("ERROR in tyrCatch : ", error);
      setLoading(false);
      return setError(error.message);
    }
  };
  if (loading) {
    return <h1>Loading.....</h1>
  }
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white">
              MindSet
            </span>
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
                placeholder="1234567890"
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
              disabled={loading}
            >
              {loading ? (
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
  );
}

export default SignUp;
