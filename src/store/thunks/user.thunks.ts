import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userClientService from "@/app/_client-services/user/user.client-service";
import { UserProfile } from "../types/user.types";

export const fetchUserProfile = createAsyncThunk<any>(
    "user/fetchUserProfile",
    async () => {
        try {
            //Fetch user profile
            const userProfile = await userClientService.getUserProfile();

            return userProfile;
        } catch (error) {
            throw error;
        }
    }
)

export const updateUserProfile = createAsyncThunk<UserProfile | any, UserProfile>(
    "user/updateUserProfile",
    async (updatedProfile: UserProfile) => {
        try {
            //Update user profile
            const result = await userClientService.updateUserProfile(updatedProfile);

            return result;
        } catch (error) {
            console.log("user/updateUserProfile:", error);
            throw error;
        }
    }
)

export const updateUserAvatar = createAsyncThunk<UserProfile | any, File>(
    "user/updateUserAvatar",
    async (avatar: File) => {
        try {
            const result = await userClientService.updateUserAvatar(avatar);

            return result;
        } catch (error) {
            console.log("user/updateUserAvatar:", error);
            throw error;
        }
    }
)

export const updateUserVoice = createAsyncThunk<UserProfile | any, File | undefined>(
    "user/updateUserVoice",
    async (voiceSample?: File) => {
        try {
            const result = await userClientService.updateUserVoice(voiceSample);

            return result;
        } catch (error) {
            console.log("user/updateUserVoice:", error);
            throw error;
        }
    }
)