import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: false,
}

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;