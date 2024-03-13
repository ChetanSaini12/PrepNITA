import React, { useEffect } from 'react';
import { VerifyToken } from '../utils/verifyToken';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../app/user/userSlice';
function Home() {
  return (
    <div className=' w-screen h-screen border-spacing-0'>
      <div >Home</div>
      <div>Hello World</div>
    </div>
  )
}

export default Home