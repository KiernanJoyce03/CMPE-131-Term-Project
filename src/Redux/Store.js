import { configureStore } from "@reduxjs/toolkit";
import userStatusReducer from "./UserStatus/UserStatus";

export const store = configureStore({
  reducer: {
    userStatus: userStatusReducer,
  },
});
