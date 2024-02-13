import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from './Loader';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { loggedIn } = useSelector((state) => state.user);
  const { username, profile_pic, role } = useSelector((state) => state.user);
  console.log("profile pic : ", profile_pic);

  useEffect(() => {
    if (!loggedIn) {
      alert("User is not authorized. Redirecting to login page");
      console.log('User is not authorized. Redirecting to login page.');
      setLoading(false);
      return navigate('/login');
    }
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='bg-slate-600 w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='text-white text-4xl mt-2'>
        Welcome {username} to your profile page. You are a {role}.
      </h1>
      <img className='rounded-full  w-20 h-20 border-white' src={profile_pic} alt='profile_pic' />
    </div>
  );

};
