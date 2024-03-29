import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../app/user/userSlice';
import toast from 'react-hot-toast';
import { Alert, Spinner, Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';
import { useMutation, useQuery } from '@apollo/client';
import { client } from '../index';
import { GET_USER_STATUS, GET_USER_STATUS_WITH_ALL_DETAILS } from '../gqlOperatons/queries';
import { VerifyToken } from '../utils/verifyToken';
import { CircularProgressbar } from 'react-circular-progressbar';

import TakeUserDetails from '../Components/TakeUserDetails';
import { UPDATE_USER } from '../gqlOperatons/mutations';
export const Profile = () => {
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
        setUserData(data.userInformation);
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

    return (<TakeUserDetails
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
    );
    // return "helloo";
  }
  else {
    return (
      <div className='min-h-screen mt-20 justify-center'>
        <div className=' flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
          <div className="flex-1 ">

            <img src={userData.profilePic || "https://images.pexels.com/photos/2690774/pexels-photo-2690774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="Profile Picture" className={`rounded-full h-48 w-48 object-cover border-8  border-[lightgray] translate-x-56 `} />
            <form className="flex flex-col gap-4"
            //  onSubmit={handleSubmit}
            >
              <div>
                <Label value="Your Username"></Label>
                <TextInput
                  type="string"
                  placeholder="jhon_Doe"
                  id="username"
                  defaultValue={userData.username}
                  readOnly
                // onChange={handleChange}
                ></TextInput>
              </div>
              <div>
                <Label value="Your Email"></Label>
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  defaultValue={userData.email}
                  readOnly
                ></TextInput>
              </div>
              <div>
                <Label value="Name"></Label>
                <TextInput
                  type="text"
                  placeholder="Name"
                  id="name"
                  defaultValue={userData.name}
                  readOnly
                ></TextInput>
              </div>
              <div>
                <Label value="Your Contact"></Label>
                <TextInput
                  type="string"
                  placeholder="+91-XXXXXXXXXX"
                  id="contactNumber"
                  defaultValue={userData.mobileNum}
                  readOnly
                ></TextInput>
              </div>

            </form>


            <Button className='my-5' onClick={handleEditMode}>Edit</Button>

          </div>
        </div>
        <div>

        </div>
      </div>


    );
  }

};
