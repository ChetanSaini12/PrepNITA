import { LoginUser, LogoutUser, setLoading } from '../app/user/userSlice';
import { GET_USER_STATUS } from '../gqlOperatons/queries';
import { client } from '../index';

// export const useVerifyToken = () => {
//   const dispatch = useDispatch();

export const VerifyToken = async (dispatch) => {
    const response = { verified: false };

    if (localStorage.getItem("token")) {
        try {
            const result = await client.query({
                query: GET_USER_STATUS,
            });

            console.log("Result from verifyToken:", result);

            const { data, errors } = result;

            if (errors) {
                console.log("Error in verifyToken:", errors);
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
            }
            else {
                console.log("waiting at verifyToken ");
                dispatch(setLoading(false));
            }
        } catch (error) {
            console.log("Error in verifyToken try catch :", error.message);
            // dispatch(setLoading(false));
            dispatch(LogoutUser());
            response.verified = false;
        }
    }
    else {
        dispatch(setLoading(false));
        dispatch(LogoutUser);
        console.log("token not present at verifyToken ");
    }

    return response;
};

