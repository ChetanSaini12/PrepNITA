import { useSearchParams } from 'react-router-dom';
import { LoginUser, LogoutUser, setLoading } from '../app/user/userSlice';
import { GET_USER_STATUS } from '../gqlOperatons/queries';
import  MyApolloProvider  from '../index';
import { useSelector } from 'react-redux';



export const VerifyToken = async (dispatch) => {
    const client=MyApolloProvider.client;
    // console.log("client at verifyToken", client)

    const response = { verified: false ,userInformation:{},authentication:{} };
    console.log("Enter in verifyToken");
    // let token=useSelector(state=>state.user.token);

    if (localStorage.getItem("token")) {
        try {
            const result = await client.query({
                query: GET_USER_STATUS,
            });

            console.log("Result from verifyToken:", result);

            const { data, errors } = result;

            if (errors) {
                console.log("Error in verifyToken 1:", errors);
                dispatch(setLoading(false));
               return  response.verified = false;
            } else if (data) {
                console.log("Data from verifyToken 1 :", data);
                  
                dispatch(LoginUser({
                    id: data.getMe.id,
                    username: data.getMe.userInformation.username,
                    role: data.getMe.userInformation.role,
                    token:localStorage.getItem("token"),
                    // profilePic: data.getMe.userInformation.profilePic
                }));
                response.verified = true;
                response.userInformation = data.getMe.userInformation;
                response.authentication = data.getMe.authentication;
                dispatch(setLoading(false));
            }
            else {
                console.log("waiting at verifyToken ");
                // dispatch(setLoading(false));
            }
        } catch (error) {
            console.log("Error in verifyToken try catch :", error.message);
            dispatch(setLoading(false));
            return response.verified=false;
            // dispatch(LogoutUser());
            // response.verified = false;
        }
    }
    else {
        dispatch(setLoading(false));
        dispatch(LogoutUser());
        console.log("token not present at verifyToken 2 ");
        return response.verified=false;
    }

    return response;
};

