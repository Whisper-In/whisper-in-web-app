import { IProfileDto, IProfileSearchDto } from "@/server-dtos/profile/profile.server-dtos";
import axiosInstance from "../axios";

const route = "profile";

export async function getProfile(profileId: string, isAI = false) {
    try {
        const result = await axiosInstance.get(`${route}/${profileId}`, {
            params: {
                isAI
            }
        });

        return <IProfileDto>result.data;
    } catch (error) {
        throw error;
    }
}

export const searchProfiles = async (query: string) => {
    try {
        const result = await axiosInstance.get(`${route}/search/${query}`);

        return <IProfileSearchDto[]>result.data;
    } catch (error) {
        console.log(error)
    }
}