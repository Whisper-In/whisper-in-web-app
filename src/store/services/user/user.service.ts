import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import { IUserProfileDto } from "@/dtos/user/user.dtos";
import axios from "axios";


const route = "/api/user";

export async function createUserSubscription(profileId: string, tier?: number, subscriptionId?: string) {
    try {
        const result = await axios.post(`${route}/subscription`, {
            profileId,
            tier,
            subscriptionId
        });

        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function getUserProfile() {
    try {
        const result = await axios.get(route);

        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function updateUserProfile(profile: IUserProfileDto) {
    try {
        const result = await axios.put(route, profile);

        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function updateUserAvatar(avatar: File) {
    try {
        const formData = new FormData();
        formData.append("avatar", avatar);

        const result = await axios.put(
            `${route}/avatar`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function updateUserVoice(voiceSample?: File) {
    try {
        const formData = new FormData();
        if (voiceSample) {
            formData.append("voice-sample", voiceSample);
        }

        const result = await axios.put(
            `${route}/voice`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return result.data;
    } catch (error) {
        throw error;
    }
}

export const createPaymentSheet = async (
    profileId: string, tier: number) => {
    try {
        const result = await axios.post(`${route}/payment-sheet`, {
            tier,
            profileId
        });

        return <ICreatePaymentSheetDto>result.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const createPaymentSubscription = async (
    profileId: string, tier?: number) => {
    try {
        const result = await axios.post(`${route}/payment-subscription`, {
            tier,
            profileId
        });

        return <ICreatePaymentSheetDto>result.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const cancelPaymentSubscription = async (profileId: string) => {
    try {
        const results = await axios.post(`${route}/cancel-subscription`, {
            profileId
        });

        return results.data;
    } catch (error) {
        throw error;
    }
}

export const followUser = async (profileId: string) => {
    try {
        const results = await axios.post(`${route}/follow/${profileId}`);

        return results.data;
    } catch (error) {
        throw error;
    }
}

export const unfollowUser = async (profileId: string) => {
    try {
        const results = await axios.delete(`${route}/follow/${profileId}`);

        return results.data;
    } catch (error) {
        throw error;
    }
}