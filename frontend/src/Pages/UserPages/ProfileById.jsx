import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserProfile } from '../../Components/UserProfile';
import { GET_USER_BY_ID, GET_USER_BY_USER_NAME } from '../../gqlOperatons/User/mutations';
import { useMutation } from '@apollo/client';
import PageNotFound from '../404Page';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';
import { Profile } from './Profile';


export const ProfileById = () => {
    let params = useParams();
    const navigate = useNavigate();

    // console.log("id", id);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const { isLoading } = useSelector((state) => state.user);
    const [ERROR, setError] = useState(null);
    const [isItMyProfile, setIsItMyProfile] = useState(false);

    const username = params.username;

    const [getUserById] = useMutation(GET_USER_BY_USER_NAME);

    useEffect(() => {
        dispatch(setLoading(true));
        if (isItMyProfile) return <Profile />;
        (async () => {
            try {
                const { data, errors } = await getUserById({
                    variables: {
                        user: {
                            username: username,
                        }
                    }
                });
                // console.log("data in profile by id ", res);
                if (errors) {
                    console.log("error in profile by id (1) ", errors);
                    dispatch(setLoading(false));
                    return setError(errors);
                }
                else {
                    console.log("userdata",data);
                    setUserData(data?.getAllUser[0]?.userInformation);
                    dispatch(setLoading(false));
                }
            } catch (err) {
                console.log("error in profile by id (2) ", err);
                dispatch(setLoading(false));
                return setError(err);
            }
        })();

    }, []);

    if (ERROR) {
        console.log("error in profile by id ", ERROR);
        toast.error(ERROR.message ? ERROR.message : "Something went wrong");
    }
    if (isLoading) return <Loader />;
    return (
        <div>
            {userData ? (<UserProfile userData={userData} />)
                : (<PageNotFound />)
            }
        </div>
    )

}
