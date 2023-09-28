import { IConfig } from "@/dtos/business/config.dtos";
import axiosInstance from "../axios";

const route = "configuration";

export const getMinSubscriptionFee = async () => {
    try {
        const result = await axiosInstance.get<IConfig>(
            `${route}/MIN_SUBSCRIPTION_FEE`
        );

        return result.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};
