import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserProfile = {
    _id: string;
    name?: string;
    aboutMe?: string;
    avatar?: string;
    email?: string;
    linkedAIProfile?: string;
}

export type UserState = {
    me?: UserProfile;
};

export const initialState: UserState = {
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<UserState>) => {
            state.me = action.payload.me;
        },
        logout: (state: UserState) => {
            state.me = undefined
        }
    }
});

export const {
    setUser,
    logout
} = userSlice.actions;

export default userSlice.reducer;