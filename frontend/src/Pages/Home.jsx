import React, { useEffect } from 'react';
import { VerifyToken } from '../utils/verifyToken';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../app/user/userSlice';
import Pic from '../Assets/HomePagePic.jpg'
import toast from 'react-hot-toast';

function Home() {
  return (
    toast.success("Welcome to the Home Page",{duration: 2000}),
    <div className='w-screen h-screen border-spacing-0' style={
      {backgroundImage: `url(${Pic})`,
    backgroundRepeat: 'no-repeat',
  backgroundSize:'cover',alignContent:'center'}
    }>

    
    </div>
  )
}

export default Home