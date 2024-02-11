import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from './Loader';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.user);

  // console.log('Token in profile page:', token, typeof (token));
  useEffect(() => {
    if (!user) {
      console.log('User is not authorized. Redirecting to login page.');
      setLoading(false);
      return navigate('/login');
    }
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <h1 className='flex justify-center items-center text-4xl bg-slate-600 w-screen h-screen border-spacing-0 '>
      Profile Page
    </h1>
  );
};
