import { createSlice } from "@reduxjs/toolkit";

export type AppState = {
    darkMode: boolean;    
    currentPlayingAudio?: string;
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
        },
        setCurrentPlayingAudio: (state: AppState, action: { payload: string | undefined }) => {
            state.currentPlayingAudio = action.payload;

            return state;
        }
    }
});

export const {
    setDarkMode,
    setCurrentPlayingAudio
} = appSlice.actions;

export default appSlice.reducer;