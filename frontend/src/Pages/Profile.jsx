import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../app/user/userSlice';
import { Alert,Spinner,Button,Label,TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

  };

  const { loggedIn,isLoading } = useSelector((state) => state.user);
  const { username, profile_pic, role } = useSelector((state) => state.user);
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  // console.log("profile pic : ", profile_pic);

  // useEffect(() => {
  //   if (!loggedIn) {
  //     alert("User is not authorized. Redirecting to login page");
  //     // console.log('User is not authorized. Redirecting to login page.');
  //     dispatch(setLoading(false));
  //     return navigate('/register');
  //   }
  //   dispatch(setLoading(false));
  // }, []);

  // if (isLoading) return <Loader />;
  const handleSubmit=(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      
    } catch (error) {
      
    }
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  return (
    <div className='min-h-screen mt-20 justify-center'>
    <div className=' flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
    <div className="flex ">
          {/* <Link to="/" className="font-bold dark:text-white text-4xl">
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
          </p> */}
        </div>
        <div className="flex-1 ">
          <img src="https://images.pexels.com/photos/2690774/pexels-photo-2690774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile Picture"  className={`rounded-full h-48 w-48 object-cover border-8  border-[lightgray] translate-x-56 `} />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
              <Label value="Your Username"></Label>
              <TextInput
                type="string"
                placeholder="jhon_Doe"
                id="username"
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
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Your Contact"></Label>
              <TextInput
                type="string"
                placeholder="+91-XXXXXXXXXX"
                id="contactNumber"
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
          </form>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
    </div>
    </div>
      

  );

};
