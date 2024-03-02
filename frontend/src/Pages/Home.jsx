import React, { useEffect } from 'react';
import { VerifyToken } from '../utils/verifyToken';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../app/user/userSlice';
import toast from 'react-hot-toast';
function Home() {
  toast.success("Welcome to the Home Page",{duration: 2000});
  return (
    <div className=' w-screen h-screen border-spacing-0'>
      <div >Home</div>
      <div>Hello World</div>
    </div>
  )
}

export default Home