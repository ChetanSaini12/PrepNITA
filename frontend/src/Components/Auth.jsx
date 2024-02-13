import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifyToken } from "../utils/verifyToken";

export const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      VerifyToken()
        .then((response) => {
          if (response.verified) {
            // Do nothing, token is verified
          } else {
            // dispatch(LogoutUser());
          }
        })
        .catch((err) => {
          // dispatch(LogoutUser());
        });
    }
  },[loggedIn]);

  return <>{children}</>;
};

