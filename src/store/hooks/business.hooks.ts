import useSWR from "swr";
import { fetcher } from "./fetcher";

const route = "api/business/configuration";

export const useGetMinSubscriptionFee = () => {
    return useSWR(`${route}/MIN_SUBSCRIPTION_FEE`, fetcher);
}