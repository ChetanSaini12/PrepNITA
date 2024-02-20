import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifyToken } from "../utils/verifyToken";
import { setLoading, LogoutUser } from "../app/user/userSlice";

export const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  

  useEffect(() => {
    const checkToken = async () => {
      try {
        console.log("Enter in Auth component");

        if (!loggedIn && localStorage.getItem("token")) {
          const response = await VerifyToken(dispatch);
          console.log("response in Auth:", response);

          if (response.verified) {
            dispatch(setLoading(false));
            // Do nothing, token is verified
          } else {
            dispatch(setLoading(false));
            dispatch(LogoutUser()); // Assuming you have a LogoutUser action
          }
        } 
        else{
          console.log("Token not present in local storage || already logged in ");
        }
      } catch (error) {
        console.log("Error in Auth try catch:", error.message);
        dispatch(setLoading(false));
        dispatch(LogoutUser());
      }
    };

    checkToken();
  }, [dispatch, loggedIn]); // Added dependencies for useEffect

  return <>{children}</>;
};
