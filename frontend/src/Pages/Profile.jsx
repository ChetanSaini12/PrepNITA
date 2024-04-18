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
import MyApolloProvider from '../index';
import { GET_USER_STATUS, GET_USER_STATUS_WITH_ALL_DETAILS } from '../gqlOperatons/queries';
import { VerifyToken } from '../utils/verifyToken';
import { CircularProgressbar } from 'react-circular-progressbar';

import TakeUserDetails from '../Components/TakeUserDetails';
import { UPDATE_USER } from '../gqlOperatons/mutations';

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
  const [moreDetails, setMoreDetails] = useState(false);

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

  const handleMoreDetails = (e) => {
    e.preventDefault();
    setMoreDetails(!moreDetails);
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

      // <div className='min-h-screen mt-20 justify-center'>
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

          <div className='flex justify-between'>
            <Button className='my-5' onClick={handleMoreDetails}>{moreDetails ? "See Less " : "See More "}</Button>
            <Button className='my-5' onClick={handleEditMode}>Edit</Button>
          </div>

        </div>
        {/* </div> */}
        <div>

        </div>
      </div>


    );

    // return (
    //   <div className="flex flex-col justify-center items-center my-4 gap-6">
    //     <div className='flex justify-center items-center gap-8'>
    //       <img
    //         src={userData.profilePic || "https://images.pexels.com/photos/2690774/pexels-photo-2690774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    //         alt="Profile Picture"
    //         className="rounded-full h-40 w-40 object-cover border border-[blue] mx-auto"
    //       />
    //       <div className=''>
    //         <h1 className='text-2xl font-semibold text-blue-500 '>
    //           {userData.name}
    //         </h1>
    //         <h2 className='text-sm   mb-4'>
    //           {"🆔" + userData.username}
    //         </h2>
    //         <div>
    //           ☏{"  " + userData.mobileNum}
    //         </div>
    //         <div>
    //           📧{"  " + userData.email}
    //         </div>
    //         <div>
    //           {userData.gender === "MALE" ? "👦🏻 Male " : "👧🏻 Female"}{"  🏚️ " + userData.state}
    //         </div>
    //       </div>

    //     </div>
    //     <div className='min-w-full flex justify-center  gap-5 border'>
    //      <h1 className='w-1/2'> Academics</h1>
    //      <h1 className='w-1/2'> Coding Profiles</h1>
    //      {/* <h1> Academics</h1> */}
    //     </div>
    //     {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen"> */}
    //     <div className='min-w-full flex flex-col gap-5'>
    //       {/* <div className="col-span-2 md:col-span-1"> */}
    //       <LabelAndTextInput label="College Name" value={userData.email} />
    //       <LabelAndTextInput label="Enrollment" value={userData.username} />
    //       <LabelAndTextInput label="Graduation Year" value={userData.name} />
    //       <LabelAndTextInput label="Course" value={userData.mobileNum} />
    //       <LabelAndTextInput label="Department" value={userData.username} />
    //       <LabelAndTextInput label="Cgpa" value={userData.email} />
    //       <LabelAndTextInput label="Hostel" value={userData.name} />
    //       {/* </div> */}
    //     </div>
    //     <div className='text-2xl font-semibold'>
    //       Coding profiles
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen">
    //       {/* <div className="col-span-2 md:col-span-1"> */}
    //       <LabelAndTextInput label="Leetcode profile" value={userData.mobileNum} />
    //       <LabelAndTextInput label="Leetcode profile" value={userData.username} />
    //       <LabelAndTextInput label="Leetcode profile" value={userData.email} />
    //       <LabelAndTextInput label="Leetcode profile" value={userData.name} />
    //       {/* </div> */}
    //     </div>
    //     <div className="flex justify-between w-full mt-5 max-w-4xl">
    //       <Button onClick={handleMoreDetails}>{moreDetails ? "See Less " : "See More "}</Button>
    //       <Button onClick={handleEditMode}>Edit</Button>
    //     </div>
    //   </div>
    // )
  }

};

// const LabelAndTextInput = ({ label, value }) => {
//   return (
//     <div className='flex justify-center items-center p-2 px-50 '>
//      <div className='text-lg w-1/2  '>{label}</div>
//      <div className='text-lg w-1/2 '>{value}</div>
//     </div>
//   );
// };
