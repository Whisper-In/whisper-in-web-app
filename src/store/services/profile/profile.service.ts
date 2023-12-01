import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import { IProfileDto, IProfileSearchDto } from "@/dtos/profile/profile.dtos";
import axios from "axios";

const route = "/api/profile";

export const getProfile = async (profileId: string) => {
    try {
        const result = await axios.get(`${route}/${profileId}`);

        return result.data as IProfileDto;
    } catch (error) {
        throw error;
    }
}

export const searchProfiles = async (query: string) => {
    try {
        const results = await axios.get(`${route}/search`, {
            params: {
                query
            }
        });

        return results.data as IProfileSearchDto[];
    } catch (error) {
        throw error;
    }
}