import { Alert, Button, Label, Spinner, TextInput, Select } from "flowbite-react";
// import Select from 'flow-bite-react-select-library';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OAuth from "../Components/OAuth";
import { useMutation } from "@apollo/client";
import { ONBOARD_USER, REGISTER_USER } from "../gqlOperatons/User/mutations";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, setLoading } from "../app/user/userSlice";
import { VerifyToken } from "../utils/verifyToken";
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';
import { CircularProgressbar } from 'react-circular-progressbar';
import toast from "react-hot-toast";
import TakeUserDetails from "../Components/TakeUserDetails";

function Onboarding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [ERROR, setError] = useState(null);
  const [imageFileUploadProgress, setImageFIleUploadProgress] = useState(0);

  const { loggedIn, isLoading, profilePic, username, ready } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(setLoading(true));
    (async () => {
      try {
        const response = await VerifyToken(dispatch);
        // console.log("res", response);
        if (response.authentication.isBoarded) {
          dispatch(setLoading(false));
          // console.log("1");
          return navigate('/');
        }
      } catch (error) {
        console.log("Error in Auth try catch:", error);
        dispatch(setLoading(false));
        return setError(error);
      }

    })();

  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [onBoardUser] = useMutation(ONBOARD_USER, {
    onError: (mutationError) => {
      console.log("Error in onBoardUser mutation:", mutationError.message);
      dispatch(setLoading(false));
      // toast.error("Error in Onboarding User ! Try again");
      return setError(mutationError);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    console.log("formData at Onboarding User :", formData);
    const { name, username, mobileNum, gender, collegeId, graduationYear, cgpa, college,
      department, course, state, hosteler } = formData;

    const leetcodeProfile = formData.leetcodeProfile || ""; const codeforcesProfile = formData.codeforcesProfile || "";
    const linkedinProfile = formData.linkedinProfile || ""; const githubProfile = formData.githubProfile || "";

    try {
      const { data, errors } = await onBoardUser({
        variables: {
          user: {
            name, username, mobileNum, gender, collegeId, graduationYear: parseInt(graduationYear, 10), cgpa: parseFloat(cgpa), college,
            department, course, state, hosteler: hosteler === 'true', leetcodeProfile, codeforcesProfile, linkedinProfile, githubProfile
          }
        }
      });

      if (errors) {
        console.log("Error in onBoardUser mutation:", errors);
        dispatch(setLoading(false));
        return setError(errors);
      }
      else if (data) {
        console.log("onBoard user form backend :", data);
        dispatch(setLoading(false));
        console.log("2");
        return navigate("/");

      }
      else {
        dispatch(setLoading(false));
        return setError("Error in Onboarding User ! Try again");
      }
    } catch (error) {
      dispatch(setLoading(false));
      return setError(error);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

  };

  if (isLoading || !ready) return <Loader />;
  if (ready && !loggedIn) {
    return navigate('/');
  }
  if (ERROR) {
    toast.error(ERROR.message ? ERROR.message : "Error in Onboarding User ! Try again");
    setTimeout(()=>{
      setError(null);
    },2000);
  }
  // const { handleChange, handleSubmit, loggedIn, imageFileUploadProgress, isLoading,Button_Text } = props;
  return (
    <TakeUserDetails
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loggedIn={loggedIn}
      imageFileUploadProgress={imageFileUploadProgress}
      isLoading={isLoading}
      profilePic={profilePic}
      Button_Text="Submit"
      formData={formData}
      setFormData={setFormData}
    />
  )

};

export default Onboarding;
