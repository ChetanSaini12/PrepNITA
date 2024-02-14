import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: undefined,
    loggedIn: false,
    isLoading: true,
    role: "USER",
    username: undefined,
    profile_pic: "https://ik.imagekit.io/pqymxdgbi/avtar.png",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        LoginUser(state, actions) {
            if (actions.payload.id) state.id = actions.payload.id;
            state.loggedIn = true;
            state.isLoading = false;
            state.role = actions.payload.role;
            state.username = actions.payload.username;
            if (actions.payload.profile_pic)
            state.profile_pic = actions.payload.profile_pic;
            else state.profile_pic = "https://ik.imagekit.io/pqymxdgbi/avtar.png";
        },
        LogoutUser(state) {
            state.id = undefined;
            state.loggedIn = false;
            state.isLoading = false;
            state.role = "USER";
            state.username = undefined;
            localStorage.removeItem("token");
        },
        setLoading(state, actions) {
            state.isLoading = actions.payload;
        },
        setProfilePic(state, actions) {
            if (actions.payload.profile_pic)
                state.profile_pic = actions.payload.profile_pic;
        }

    },
});

export const { LoginUser, LogoutUser, setLoading, setProfilePic } = userSlice.actions;
export default userSlice.reducer;
