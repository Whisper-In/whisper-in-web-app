import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import { IProfileSearchDto } from "@/dtos/profile/profile.dtos";
import axios from "axios";

const route = "/api/profile";

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