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

export const createPaymentSubscription = async (
    amount: number,
    metadata: { userId: string, aiProfileId: string }) => {
    try {
        const result = await axios.post(`${route}/payment-subscription`, {
            amount,
            metadata
        });

        return <ICreatePaymentSheetDto>result.data;
    } catch (error) {
        console.log(error)
    }
}

export const cancelPaymentSubscription = async (userId: string, aiProfileId: string) => {
    try {
        const results = await axios.post(`${route}/cancel-subscription`, {
            userId,
            aiProfileId
        });

        return results.data;
    } catch (error) {
        throw error;
    }
}