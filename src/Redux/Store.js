import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userStatusReducer from "./UserStatus/UserStatus";
import darkModeReducer from "./DarkMode/darkMode";

const darkModePersistConfig = {
  key: "darkMode",
  storage,
};

const userStatusPersistConfig = {
  key: "userStatus",
  storage,
};

export const store = configureStore({
  reducer: {
    userStatus: persistReducer(userStatusPersistConfig, userStatusReducer),
    darkMode: persistReducer(darkModePersistConfig, darkModeReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
