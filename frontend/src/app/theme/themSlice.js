import { createSlice } from "@reduxjs/toolkit";

const initialState={
    theme:'light',
};

const themeSLice=createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme:(state)=>{
            state.theme=state.theme==='light' ? 'dark':'light';
        },

    }
})

export const {toggleTheme}=themeSLice.actions;
export default themeSLice.reducer;