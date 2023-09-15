import axios from "axios";


const route = "/api/user";

export async function createUserAISubscription(userId: string, aiProfileId: string, tier?: number, subscriptionId?: string) {
    try {
        const result = await axios.post(`${route}/create-ai-subscription`, {
            userId,
            aiProfileId,
            tier,
            subscriptionId
        });

        return result.data;
    } catch (error) {
        throw error;
    }
}