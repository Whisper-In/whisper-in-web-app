import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import axios from "axios";

const route = "/api/payment";

export async function createSubscriptionPaymentSheet(
    amount: number,
    metadata: { userId: string, aiProfileId: string },
    customerStripeId?: string
) {
    try {
        const results = await axios.post(`${route}/create-subscription`, {
            amount,
            metadata,
            customerStripeId
        });

        return <ICreatePaymentSheetDto>results.data;
    } catch (error) {
        throw error;
    }
}

export async function cancelSubscription(
    stripeSubscriptionId: string
) {
    try {
        const results = await axios.post(`${route}/cancel-subscription`, {
            stripeSubscriptionId
        });

        return results.data;
    } catch (error) {
        throw error;
    }
}