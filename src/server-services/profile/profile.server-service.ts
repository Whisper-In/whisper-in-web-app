import { IProfileDto, IProfileSearchDto } from "@/dtos/profile/profile.dtos";
import axiosInstance from "../axios";

const route = "profile";

export async function getProfile(profileId: string) {
    try {        
        const result = await axiosInstance.get(`${route}/${profileId}`);

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