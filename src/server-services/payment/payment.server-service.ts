import { ICreatePaymentSheetDto } from "@/server-dtos/payment/payment.server-dtos";
import axiosInstance from "../axios";

const route = "payment";

export const createSubscriptionPaymentSheet = async (
    amount: number,
    metadata: { userId: string, aiProfileId: string },
    customerStripeId?: string) => {
    try {
        const result = await axiosInstance.post(`${route}/payment-sheet`, {
            amount,
            metadata,
            customerStripeId
        });

        return <ICreatePaymentSheetDto>result.data;
    } catch (error) {
        console.log(error)
    }
}

export const cancelSubscription = async (stripeSubscriptionId: string) => {
    try {
        const result = await axiosInstance.post(`${route}/cancel-subscription`, { stripeSubscriptionId });

        return result.data;
    } catch (error) {
        console.log(error);
    }
}