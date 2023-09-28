import { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../states/user.states";
import { UserProfile } from "../types/user.types";

export const setUser = (state: UserState, action: PayloadAction<UserProfile>) => {
    state.me = action.payload;    

    return state
}

export const logout = (state: UserState) => {
    state.me = undefined

    return state
}