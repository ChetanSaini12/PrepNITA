import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import toast from 'react-hot-toast';
import { Alert, Spinner, Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import OAuth from '../../Components/OAuth';
import Lottie from 'react-lottie';
import animationData from '../../lotties/startup.json';
import { useMutation, useQuery } from '@apollo/client';
import MyApolloProvider from '../../index';
import { GET_USER_FOR_PROFILE, GET_USER_STATUS, GET_USER_STATUS_WITH_ALL_DETAILS } from '../../gqlOperatons/queries';
import { VerifyToken } from '../../utils/verifyToken';
import { CircularProgressbar } from 'react-circular-progressbar';

import TakeUserDetails from '../../Components/TakeUserDetails';
import { UPDATE_USER } from '../../gqlOperatons/mutations';
import { UserProfile } from '../../Components/UserProfile';

export const Profile = () => {
  const client = MyApolloProvider.client;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

  };

  const { loggedIn, isLoading, profilePic } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [ready, setReady] = useState(false);
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [imageFileUploadProgress, setImageFIleUploadProgress] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  // const [moreDetails, setMoreDetails] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER, {
    onError(error) {
      console.log("Error in updating user", error);
      toast.error("Error in updating user");
    }
  });




  useEffect(() => {
    dispatch(setLoading(true));
    VerifyToken(dispatch).then((data) => {
      console.log("userdata in profile", data);
      if (data.verified) {
        MyApolloProvider.client.query({ query: GET_USER_FOR_PROFILE }).then((res) => {
          console.log("User Data in Profile", res);
          setUserData(res.data.getMe.userInformation);
          // setFormData(res.data.getMe.userInformation);
        }).catch((error) => {
          console.log("error in getting user data at profile page ", error);
        });
        // setUserData(data.userInformation);

        dispatch(setLoading(false));
        setReady(true);
      }
      else {
        setLoading(false);
        setReady(true);
        dispatch(setLoading(false));
      }
    }).catch((error) => {
      console.log("Error in profile:", error);
      dispatch(setLoading(false));
      setReady(true);
    });

  }, []);


  const handleSubmit = (e) => {
    dispatch(setLoading(true));
    console.log("Form Data at Updating user ", formData);
    e.preventDefault();
    const { username,
      name, mobileNum, profilePic, gender,
      collegeId, graduationYear, cgpa, college, department, course, state,
      hosteler, leetcodeProfile, codeforcesProfile, linkedinProfile, githubProfile } = formData;
    try {
      updateUser({
        variables: {
          user: {
            name, username, mobileNum, gender, collegeId, graduationYear: parseInt(graduationYear, 10), cgpa: parseFloat(cgpa), college,
            department, course, state, hosteler: hosteler === 'true', leetcodeProfile, codeforcesProfile, linkedinProfile, githubProfile
          }
        }
      }).then(res => {
        console.log("User Updated ** ", res);
        if (res.errors) {
          dispatch(setLoading(false));
        }
        else {
          toast.success("User Updated");
          dispatch(setLoading(false));
          setEditMode(false);
          setUserData(res.data.updateUserProfile.userInformation);
        }
      })
        .catch(err => {
          console.log("Error in updating user", err);
          toast.error("Error in updating user");
          dispatch(setLoading(false));
        });
    } catch (error) {

    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleEditMode = async () => {
    dispatch(setLoading(true));
    try {
      const res = await client.query({ query: GET_USER_STATUS_WITH_ALL_DETAILS });
      // setUserInfo(res.data.getMe);
      setFormData(res.data.getMe.userInformation);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
    setEditMode(true);
  };

  if (isLoading || ready === false) return <Loader />;
  if (!isLoading && loggedIn === false) navigate('/register');
  if (editMode) {

    // const userInfo = await client.query({ query: GET_USER_STATUS_WITH_ALL_DETAILS });

    return (
      <div>
        <div className='flex justify-end mx-10 my-2'>
          <button className='text-red-700 text-xl  bg-white px-2 py-1 rounded-sm hover:bg-red-300 hover:text-white'
            onClick={() => setEditMode(false)}
          > X </button>
        </div>
        <TakeUserDetails
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loggedIn={loggedIn}
          imageFileUploadProgress={imageFileUploadProgress}
          isLoading={isLoading}
          profilePic={profilePic}
          Button_Text="Save"
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    );
    // return "helloo";
  }
  else {
    return (
      <div>
        <UserProfile userData={userData} />
        <div className="flex justify-start w-full my-5 mx-3 max-w-4xl gap-5 ">
          <Button className='' onClick={handleEditMode}>⚙️Edit</Button>
        </div>
      </div>
    )
  }

};

