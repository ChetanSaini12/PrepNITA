import React, { useEffect } from 'react';
import { VerifyToken } from '../utils/verifyToken';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../app/user/userSlice';
function Home() {
  // const dispatch = useDispatch();
  // const loggedIn = useSelector((state) => state.user.loggedIn);

  // useEffect(() => {
  // if (!loggedIn) {
  //   VerifyToken()
  //     .then((response) => {
  //       console.log("res from home page ", response);
  //       if (response.verified) {
  //         // Do nothing, token is verified 
  //       } else {
  //         // dispatch(LogoutUser());
  //       }
  //     })
  //     .catch((err) => {
  //       // dispatch(LogoutUser());
  //     });
  // }
  // else{
  //   console.log("user is logged in");
  // }
  // }, []);
  return (
    <div className='bg-slate-600 w-screen h-screen border-spacing-0'>
      <div >Home</div>
      <div>Hello World</div>
    </div>
  )
}

export default Home