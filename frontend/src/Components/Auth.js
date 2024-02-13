import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_USER_STATUS } from '../gqlOperatons/queries';
import { LoginUser,setLoading } from '../app/user/userSlice';
import { Loader } from '../Pages/Loader';

export const VerifyToken = () => {
  const { isLoading, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { data, error } = useQuery(GET_USER_STATUS);
  // console.log("Data from verifyToken:", token);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        console.log("token is present ", token);
        try {
          if (error) {
            console.log("Error in verifyToken:", error.message);
            dispatch(setLoading(false));
          } else if (data) {
            console.log("Data from verifyToken:", data);
            // dispatch(LoginUser({
            //   username: data.getUserStatus.username,
            //   role: data.getUserStatus.role,
            //   profile_pic: data.getUserStatus.profile_pic,
            // }));
          } else {
            console.log("Token is not present {verified token: false}");
            dispatch(setLoading(false));
          }
        } catch (error) {
          console.error("An error occurred while fetching data:", error);
        }
      }
      else {
        console.log("Token is not present ");
        dispatch(setLoading(false));
        return { verified: false };

      }
    };

    fetchData();
  }, [token, data, error]);
  if (isLoading) <Loader />;
  // return { verified: false }; // You may want to return a meaningful value based on your requirements
};

