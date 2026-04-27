import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
};

const userStatusSlice = createSlice({
    name: "userStatus",
    initialState: initialState,
    reducers:{
        getUserStatus: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userInfo = action.payload.userInfo;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.isAdmin = false;
            
        }
    }
});

export const { getUserStatus, logout } = userStatusSlice.actions;
export default userStatusSlice.reducer;