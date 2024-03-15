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
import { useQuery } from '@apollo/client';
import { client } from '../index';
import { GET_USER_STATUS } from '../gqlOperatons/queries';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

  };

  const { loggedIn, isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});



  useEffect(() => {
    if (!loggedIn) {
      // alert("User is not authorized. Redirecting to login page");
      toast.error('User is not authorized to view profile page . Redirecting to login page.');
      // console.log('User is not authorized. Redirecting to login page.');
      dispatch(setLoading(false));
      return navigate('/register');
    }

    // setUserData(myData);
    client.query({
      query: GET_USER_STATUS,
    }).then((data) => {
      console.log("userdata in profile", data);
      setUserData(data.data.getMe.userInformation);
    }).catch((error) => {
      console.log("Error in profile:", error);
    });
    dispatch(setLoading(false));
  }, []);

  if (isLoading) return <Loader />;
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);

    } catch (error) {

    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className='min-h-screen mt-20 justify-center'>
      <div className=' flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
        <div className="flex ">
        
        </div>
        <div className="flex-1 ">
          <img src={userData.profilePic||"https://images.pexels.com/photos/2690774/pexels-photo-2690774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="Profile Picture" className={`rounded-full h-48 w-48 object-cover border-8  border-[lightgray] translate-x-56 `} />
          <form className="flex flex-col gap-4"
          //  onSubmit={handleSubmit}
          >
            <div>
              <Label value="Your Username"></Label>
              <TextInput
                type="string"
                placeholder="jhon_Doe"
                id="username"
                value={userData.username}
              // onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                // onChange={handleChange}
                value={userData.email}
              ></TextInput>
            </div>
            <div>
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                // onChange={handleChange}
                value={"****....***"}
              ></TextInput>
            </div>
            <div>
              <Label value="Your Contact"></Label>
              <TextInput
                type="string"
                placeholder="+91-XXXXXXXXXX"
                id="contactNumber"
                value={userData.mobileNum}
                // onChange={handleChange}
              ></TextInput>
            </div>
          
          </form>

        </div>
      </div>
    </div>


  );

};
