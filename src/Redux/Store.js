import { configureStore } from "@reduxjs/toolkit";
import userStatusReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    userStatus: userStatusReducer,
  },
});
