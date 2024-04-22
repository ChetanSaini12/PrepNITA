import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifyToken } from "../utils/verifyToken";
import { setLoading, LogoutUser } from "../app/user/userSlice";
import { setContext } from "@apollo/client/link/context";

export const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const { loggedIn, id } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      console.log("Enter in Auth component");
      console.log('LoggedIn : ', loggedIn);
      try {
        if ((!loggedIn && token)) {
          console.log('YHA token hai but login nhi h ');

          try {
            const response=await VerifyToken(dispatch);
              console.log("response in Auth:", response);
              if (response.verified) {
                dispatch(setLoading(false));
                // const authLink = setContext(async (_, { headers }) => {
                //   // Return the headers to the context so httpLink can read them
                //   return {
                //     headers: {
                //       ...headers,
                //       authorization: token ? token : "",
                //     },
                //   };
                // });
                // authLink();
                // Do nothing, token is verified
              } else {
                dispatch(setLoading(false));
              return  dispatch(LogoutUser()); // Assuming you have a LogoutUser action
              }

          } catch (error) {
            console.log("error in auth try catch", error);
            dispatch(setLoading(false));
           return dispatch(LogoutUser());
          }
        }
        else if (!token) {
          console.log('TOKEN IS NOT PRESENT!');
          dispatch(LogoutUser)
        }
        else {
          console.log("Already logged in");
        }
      } catch (error) {
        console.log("Error in Auth try catch:", error.message);
        dispatch(setLoading(false));
       return dispatch(LogoutUser());
      }
    })();
  }, [loggedIn, id]); // Added dependencies for useEffect

  return <>{children}</>;
};
