import { Alert, Button, Label, Spinner, TextInput, Select } from "flowbite-react";
// import Select from 'flow-bite-react-select-library';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OAuth from "../Components/OAuth";
import { useMutation } from "@apollo/client";
import { ONBOARD_USER, REGISTER_USER } from "../gqlOperatons/mutations";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, setLoading } from "../app/user/userSlice";
import { VerifyToken } from "../utils/verifyToken";
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';
import toast from "react-hot-toast";

function Onboarding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const { loggedIn, isLoading } = useSelector((state) => state.user);


  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const response = await VerifyToken(dispatch);
  //       if (response.verified) {
  //         dispatch(setLoading(false));
  //         navigate('/');
  //       }

  //     } catch (error) {
  //       console.log("Error in Auth try catch:", error.message);
  //       dispatch(setLoading(false));
  //     }
  //   };

  //   checkToken();
  // }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [onBoardUser] = useMutation(ONBOARD_USER, {
    onError: (mutationError) => {
      console.log("Error in onBoardUser mutation:", mutationError.message);
      dispatch(setLoading(false));
      return toast.error(mutationError.message);
      // return setError(mutationError.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(false));
    const { name, username, mobileNum, gender, college_id, graduation_year, cgpa, college,
      department, course, state, hosteler } = formData;

    const leetcodeProfile = formData.leetcodeProfile || ""; const codeforcesProfile = formData.codeforcesProfile || ""; const linkedinProfile = formData.linkedinProfile || ""; const githubProfile = formData.githubProfile || "";

    onBoardUser({
      variables: {
        user: {
          name, username, mobileNum, gender, college_id, graduation_year:parseInt(graduation_year,10), cgpa:parseFloat(cgpa), college,
          department, course, state, hosteler:hosteler==='true', leetcodeProfile, codeforcesProfile, linkedinProfile, githubProfile
        }
      }
    })
      .then((user) => {
        console.log("onBoard user form backend :", user);
        // Handle success or navigation here
        if (!user || !user.data) {
          console.log("Error in onBoardUser user:", user.errors.message || "Internal Server Error");
          dispatch(setLoading(false));
          return toast.error(user.errors.message || "Internal Server Error");
          // return setError(user.errors.message || "Internal Server Error");
        }
        else {
          // const { id, email, username, role } = user.data.createUser;
          // dispatch(LoginUser({
          //   id, email, firstName, lastName, mobileNum, username, role
          // }));
          // localStorage.se
          dispatch(setLoading(false));
          return navigate("/");
        }
      })
      .catch((catchError) => {
        console.log("Error in signUpUser catch block:", catchError);
        dispatch(setLoading(false));
        return toast.error(catchError.message);
        // return setError(catchError);
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
              <Label value="* Your Username "></Label>
              <TextInput
                required
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="* Full Name "></Label>
              <TextInput
                required
                type="text"
                placeholder="John Doe"
                id="name"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="* Your Mobile Number"></Label>
              <TextInput
                required
                type="text"
                placeholder="+91-0000000000"
                id="mobileNum"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="* Enrollment no "></Label>
              <TextInput
                required
                type="text"
                placeholder="21UEE055"
                id="college_id"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="* Graduation Year"></Label>
              <TextInput
                required
                type="Integer"
                placeholder="2025"
                id="graduation_year"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="* College"></Label>
              <Select
                id="college"
                name="college"
                onChange={handleChange}
              >
                <option selected>Choose your College </option>
                <option value="NIT AGARTALA">NIT AGARTALA</option>
                <option value="IIIT AGARTALA">IIIT AGARTALA</option>

              </Select>
            </div>
            <div>
              <Label value="* Course"></Label>
              <Select
              required
                id="course"
                name="course"
                onChange={handleChange}
              >
                BTech
                PhD
                MCA
                MTech
                <option selected>Choose your Course </option>
                <option value="BTech">BTech</option>
                <option value="BTech">BTech</option>
                <option value="MCA">MCA</option>
                <option value="MTech">MTech</option>

              </Select>
            </div>

            <div>
              <Label value="* CGPA"></Label>
              <TextInput
                required
                type="float"
                placeholder="9.23"
                id="cgpa"
                onChange={handleChange}
              ></TextInput>
            </div>

            <div>
              <Label value="* State"></Label>
              <TextInput
                required
                type="text"
                placeholder="Rajasthan"
                id="state"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="* Hostler"></Label>
              <Select
                id="hostler"
                name="hostler"
                onChange={handleChange}
              >
                {/* <option selected> </option> */}
                <option value="true">YES</option>
                <option value="false">NO</option>

              </Select>
            </div>
            <div>
              <Label value="* Gender"></Label>
              <Select
                id="gender"
                name="gender"
                onChange={handleChange}
              >
                <option selected>Choose your gender </option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="TRANSGENDER">TRANSGENDER</option>
                <option value="PREFER_NOT_TO_SAY">PREFER_NOT_TO_SAY</option>
              </Select>

            </div>

            <div>
              <Label value="* Department"></Label>
              <Select
                id="department"
                name="department"
                onChange={handleChange}
              >

                <option selected>Choose your College </option>
                <option value="COMPUTER_SCIENCE_AND_ENGINEERING">CSE</option>
                <option value="ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING">ECE</option>
                <option value="ELECTRICAL_ENGINEERING">EE</option>
                <option value="ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING">EI</option>
                <option value="MECHANICAL_ENGINEERING">Mechanical</option>
                <option value="CHEMICAL_ENGINEERING">Chemical</option>
                <option value="CIVIL_ENGINEERING">Civil</option>
                <option value="PRODUCTION_ENGINEERING">Production</option>
                <option value="BIO_TECH_AND_BIO_ENGINEERING">Bio_Tech</option>
              </Select>
            </div>
            <div>
              <Label value="Leetcode Profile"></Label>
              <TextInput
                type="text"
                placeholder="https://leetcode.com/username/"
                id="leetcodeProfile"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Codeforces Profile"></Label>
              <TextInput
                type="text"
                placeholder="https://codeforces.com/username/"
                id="codeforcesProfile"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Linkedin Profile"></Label>
              <TextInput
                type="text"
                placeholder="https://linkedin.com/username/"
                id="linkedProfile"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Github Profile"></Label>
              <TextInput
                type="text"
                placeholder="https://github.com/username/ "
                id="githubProfile"
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
                "Submit"
              )}
            </Button>
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

export default Onboarding;
