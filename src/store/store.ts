import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { userSlice } from "./slices/user.slice"

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer
    },
    devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


