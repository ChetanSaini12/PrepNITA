import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../../Components/UserProfile';
import { GET_USER_BY_ID } from '../../gqlOperatons/mutations';
import { useMutation } from '@apollo/client';
import PageNotFound from '../404Page';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';


export const ProfileById = () => {
    let params = useParams();
    const id = params.id;
    console.log("id", id);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const { isLoading } = useSelector((state) => state.user);
    const [getUserById] = useMutation(GET_USER_BY_ID, {
        onError(error) {
            console.log("error in profile by id ", error);
        }
    });

    useEffect(() => {
        dispatch(setLoading(true));
        getUserById({
            variables: {
                id: parseInt(id)
            }
        })
            .then((res) => {
                console.log("data in profile by id ", res);
                if (!res.data||res.errors) {
                    console.log("error in profile by id (1) ", res.errors);
                }
                else {
                    setUserData(res.data.getUserById.userInformation);
                }
                dispatch(setLoading(false));

            })
            .catch((err) => {
                console.log("error in profile by id (2) ", err);
                dispatch(setLoading(false));
            });
    }, []);

    if (isLoading)return <Loader />;
        return (
            <div>
                {userData ? (<UserProfile userData={userData} />)
                    : (<PageNotFound />)}
            </div>
        )
    
}
