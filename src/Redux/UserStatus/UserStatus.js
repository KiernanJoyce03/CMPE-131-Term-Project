import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userInfo: null,
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
        }
    }
});

export const {getUserStatus} = userStatusSlice.actions;
export default userStatusSlice.reducer;