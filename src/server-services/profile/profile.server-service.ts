import { IProfileDto, IProfileSearchDto } from "@/server-dtos/profile/profile.server-dtos";
import axiosInstance from "../axios";
import { ICreatePaymentSheetDto } from "@/server-dtos/payment/payment.server-dtos";

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


export const createPaymentSubscription = async (
    amount: number,
    metadata: { userId: string, aiProfileId: string }) => {

    try {
        const result = await axiosInstance.post(`${route}/payment-subscription`, {
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
        const result = await axiosInstance.post(`${route}/cancel-subscription`, {
            userId, aiProfileId
        });

        return result.data;
    } catch (error) {
        console.log(error)
    }
}