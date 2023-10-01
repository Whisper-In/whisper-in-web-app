import { IConfig } from "@/dtos/business/config.dtos";
import axios from "axios";

const route = "api/business/configuration";

export async function getMinSubscriptionFee() {
    try {
        const result = await axios.get(`${route}/min-subscription-fee`);

        return result.data as IConfig;
    } catch (error) {
        throw error;
    }
}