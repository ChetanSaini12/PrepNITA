import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from './Loader';

export const Profile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
    setReady(true);
  }, []);

  if (!ready) {
    console.log('Not ready in profile page');
    return <Loader />;
  }

  console.log('Token in profile page:', token,typeof(token));
  
  if (!token || token==="null") {
    console.log('User is not authorized. Redirecting to login page.');
     navigate('/login');
    return null; // Prevent rendering the profile content if redirecting
  }

  console.log('User is authorized.');

  return (
    <h1 className='flex justify-center items-center text-4xl bg-slate-600 w-screen h-screen border-spacing-0 '>
      Profile
    </h1>
  );
};
