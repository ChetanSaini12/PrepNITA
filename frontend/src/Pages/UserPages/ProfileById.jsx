import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../../Components/UserProfile';
import { GET_USER_BY_ID } from '../../gqlOperatons/mutations';
import { useMutation } from '@apollo/client';
import PageNotFound from '../404Page';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';


export const ProfileById = () => {
    let params = useParams();
    const id = params.id;
    console.log("id", id);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const { isLoading } = useSelector((state) => state.user);
    const [ERROR, setError] = useState(null);

    const [getUserById] = useMutation(GET_USER_BY_ID);
    useEffect(() => {
        dispatch(setLoading(true));
        (async () => {
            try {
                const {data,errors} = await getUserById({
                    variables: {
                        id: parseInt(id)
                    }
                });
                // console.log("data in profile by id ", res);
                if (errors) {
                    console.log("error in profile by id (1) ", errors);
                    dispatch(setLoading(false));
                    return setError(errors);
                }
                else {
                    setUserData(data.getUserById.userInformation);
                    dispatch(setLoading(false));
                }
            } catch (err) {
                console.log("error in profile by id (2) ", err);
                dispatch(setLoading(false));
                return setError(err);
            }
        })();

    }, []);

    if(ERROR){
        console.log("error in profile by id ", ERROR);
         toast.error(ERROR.message?ERROR.message:"Something went wrong");
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
