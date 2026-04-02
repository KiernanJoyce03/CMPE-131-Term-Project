import { configureStore } from "@reduxjs/toolkit";
import userStatusReducer from "./UserStatus/UserStatus";
import darkModeReducer from "./DarkMode/darkMode"; 

export const store = configureStore({
  reducer: {
    userStatus: userStatusReducer,
    darkMode: darkModeReducer,
  },
});
