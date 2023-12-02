import { IConfig } from "@/dtos/business/config.dtos";
import axios from "axios";

const route = "api/configuration";

export async function getMinSubscriptionFee() {
    try {
        const result = await axios.get(`${route}/MIN_SUBSCRIPTION_FEE`);

        return result.data as IConfig;
    } catch (error) {
        throw error;
    }
}