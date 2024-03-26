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
    const checkToken = async () => {
      console.log("Enter in Auth component");
      try {
        console.log('LoggedIn : ', loggedIn);
        if ((!loggedIn && token)) {
          console.log('YHA token hai but login nhi h ');
          VerifyToken(dispatch).then((response) => {
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
              dispatch(LogoutUser()); // Assuming you have a LogoutUser action
            }
          })
            .catch((error) => {
              console.log("Error in Auth:", error);
              dispatch(setLoading(false));
              dispatch(LogoutUser());
            })

        }
        else if (!token) {
          dispatch(LogoutUser)
          console.log('TOKEN IS NOT PRESENT!');
        }
        else {
          console.log("Already logged in");
        }
      } catch (error) {
        console.log("Error in Auth try catch:", error.message);
        dispatch(setLoading(false));
        dispatch(LogoutUser());
      }
    };

    checkToken();
  }, [loggedIn,id]); // Added dependencies for useEffect

  return <>{children}</>;
};
