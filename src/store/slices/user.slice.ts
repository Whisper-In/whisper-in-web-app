import { createSlice } from "@reduxjs/toolkit";

export type UserProfile = {
    id: string;
    name?: string;
    aboutMe?: string;
    avatar?: string;
    email?: string;
    linkedAIProfile?: string;
}

export type UserState = {
    me?: UserProfile;
    token?: string;
};

export const initialState: UserState = {
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState: (state, action) => {
            state.me = action.payload.me;
            state.token = action.payload.token;
        }
    }        
});

export const {
    setUserState
} = userSlice.actions;

export default userSlice.reducer;