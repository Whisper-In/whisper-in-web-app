import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserAvatar, updateUserProfile, updateUserVoice } from "../thunks/user.thunks";
import * as userReducers from "../reducers/user.reducers";
import { UserState } from "../states/user.states";

export const initialState: UserState = {
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: userReducers.setUser,
        logout: userReducers.logout
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, userReducers.setUser);
        builder.addCase(updateUserProfile.fulfilled, userReducers.setUser);
        builder.addCase(updateUserAvatar.fulfilled, userReducers.setUser);
        builder.addCase(updateUserVoice.fulfilled, userReducers.setUser);
    }
});

export const {
    setUser,
    logout
} = userSlice.actions;

export default userSlice.reducer;