import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_USER_STATUS } from '../gqlOperatons/queries';
import { LoginUser, setLoading } from '../app/user/userSlice';

export const VerifyToken = async () => {
    const dispatch = useDispatch();
    const response = { verified: false };

    const { data, error } = useQuery(GET_USER_STATUS);
    if (localStorage.getItem("token")) {
        if (error) {
            console.log("Error in verifyToken:", error.message);
            dispatch(setLoading(false));
            response.verified = false;
        } else if (data) {
            console.log("Data from verifyToken:", data);
            dispatch(LoginUser({
                id: data.getMe.id,
                username: data.getMe.username,
                role: data.getMe.role,
            }));
            dispatch(setLoading(false));
            response.verified = true;
        } else {
            console.log("loading at verifyToken ");
            dispatch(setLoading(false));
        }
        return response;
    }
    else return { verified: false };

};

