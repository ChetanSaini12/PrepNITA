import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: undefined,
    loggedIn: false,
    isLoading: true,
    role: "USER",
    username: undefined,
    name: undefined,
    profilePic: "https://ik.imagekit.io/pqymxdgbi/avtar.png",
    token: "",
    ready: false,
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
            if(actions.payload.name){
                state.name = actions.payload.name;
            }
            if (actions.payload.token) {
                state.token = actions.payload.token;
                localStorage.setItem("token", actions.payload.token);
            }
            if (actions.payload.profilePic)
                state.profilePic = actions.payload.profilePic;
            else state.profilePic = "https://ik.imagekit.io/pqymxdgbi/avtar.png";
            state.ready = true;
        },
        LogoutUser(state) {
            state.id = undefined;
            state.loggedIn = false;
            state.isLoading = false;
            state.role = "USER";
            state.username = undefined;
            localStorage.removeItem("token");
            state.token = "";
            state.ready = true;
            state.name=undefined;
        },
        setLoading(state, actions) {
            state.isLoading = actions.payload;
            // state.ready = !actions.payload;
        },
        setToken(state, actions) {
            state.token = actions.payload;
            localStorage.setItem("token", actions.payload);
        }
        ,
        setProfilePic(state, actions) {
            if (actions.payload.profilePic)
                state.profilePic = actions.payload.profilePic;
        }
        ,
        setReadyStates(state, actions) {
            state.ready = actions.payload;
        }

    },
});

export const { LoginUser, LogoutUser, setLoading, setProfilePic, setToken, setReadyStates } = userSlice.actions;
export default userSlice.reducer;
