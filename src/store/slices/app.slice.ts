import { createSlice } from "@reduxjs/toolkit";

export type AppState = {
    darkMode: boolean;
};

export const initialAppState: AppState = {
    darkMode: true,
};


export const appSlice = createSlice({
    name: "app",
    initialState: initialAppState,
    reducers: {
        setDarkMode: (state: AppState, action: { payload: boolean }) => {
            state.darkMode = action.payload;

            return state;
        }
    }
});

export const {
    setDarkMode
} = appSlice.actions;

export default appSlice.reducer;