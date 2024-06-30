import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  Select,
} from "flowbite-react";
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
import Lottie from "react-lottie";
import animationData from "../../src/lotties/startup.json";
import { CircularProgressbar } from "react-circular-progressbar";
import toast from "react-hot-toast";
import TakeUserDetails from "../Components/TakeUserDetails";
import { useDropzone } from "react-dropzone";

function Onboarding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [ERROR, setError] = useState(null);
  const [imageFileUploadProgress, setImageFIleUploadProgress] = useState(0);

  const { loggedIn, isLoading, profile_pic, username } = useSelector(
    (state) => state.user
  );

  const optionMappings = {
    college: {
      "National Institute of Technology AGARTALA": "NIT AGARTALA",
      "Indian Institute of Information Technology AGARTALA": "IIIT AGARTALA",
    },
    course: {
      BTech: "BTech",
      MCA: "MCA",
      MTech: "MTech",
    },
    hosteller: {
      YES: "YES",
      NO: "NO",
    },
    gender: {
      Male: "MALE",
      Female: "FEMALE",
      Transgender: "TRANSGENDER",
      "Prefer not to say": "PREFER_NOT_TO_SAY",
    },
    department: {
      "Computer Science & Engineering": "COMPUTER_SCIENCE_AND_ENGINEERING",
      "Electronics & Communication Engineering":
        "ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING",
      "Electrical Engineering": "ELECTRICAL_ENGINEERING",
      "Electronics & Instrumentation Engineering":
        "ELECTRONICS_AND_INSTRUMENTATION_ENGINEERING",
      "Mechanical Engineering": "MECHANICAL_ENGINEERING",
      "Chemical Engineering": "CHEMICAL_ENGINEERING",
      "Civil Engineering": "CIVIL_ENGINEERING",
      "Production Engineering": "PRODUCTION_ENGINEERING",
      "Bio Tech & Bio Engineering": "BIO_TECH_AND_BIO_ENGINEERING",
    },
  };

  useEffect(() => {
    dispatch(setLoading(true));
    (async () => {
      try {
        const response = await VerifyToken(dispatch);
        // console.log("res", response);
        if (response.authentication.isBoarded) {
          dispatch(setLoading(false));
          // console.log("1");
          // navigate('/');
        }
      } catch (error) {
        console.log("Error in Auth try catch:", error);
        dispatch(setLoading(false));
        return setError(error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const mappedValue = optionMappings[id] ? optionMappings[id][value] : value;
    setFormData({ ...formData, [id]: mappedValue });
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
    const {
      name,
      username,
      mobileNum,
      gender,
      collegeId,
      graduationYear,
      cgpa,
      college,
      department,
      course,
      state,
      hosteler,
    } = formData;

    const leetcodeProfile = formData.leetcodeProfile || "";
    const codeforcesProfile = formData.codeforcesProfile || "";
    const linkedinProfile = formData.linkedinProfile || "";
    const githubProfile = formData.githubProfile || "";

    try {
      const { data, errors } = await onBoardUser({
        variables: {
          user: {
            name,
            username,
            mobileNum,
            gender,
            collegeId,
            graduationYear: parseInt(graduationYear, 10),
            cgpa: parseFloat(cgpa),
            college,
            department,
            course,
            state,
            hosteler: hosteler === "true",
            leetcodeProfile,
            codeforcesProfile,
            linkedinProfile,
            githubProfile,
          },
        },
      });

      if (errors) {
        console.log("Error in onBoardUser mutation:", errors);
        dispatch(setLoading(false));
        return setError(errors);
      } else if (data) {
        console.log("onBoard user form backend :", data);
        dispatch(setLoading(false));
        console.log("2");
        return navigate("/");
      } else {
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

  if (isLoading) return <Loader />;
  if (!isLoading && !loggedIn) {
    // console.log("isLding", isLoading, loggedIn, username);
    // console.log("3");
    return navigate("/");
  }
  // const { handleChange, handleSubmit, loggedIn, imageFileUploadProgress, isLoading,Button_Text } = props;
  return (
    <TakeUserDetails
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loggedIn={loggedIn}
      imageFileUploadProgress={imageFileUploadProgress}
      isLoading={isLoading}
      profile_pic={profile_pic}
      Button_Text="Submit"
      formData={formData}
      setFormData={setFormData}
    />
  );
}

export default Onboarding;
