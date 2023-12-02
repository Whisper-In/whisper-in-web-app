import useSWR from "swr";
import { fetcher } from "./fetcher";

const route = "api/configuration";

export const useGetMinSubscriptionFee = () => {
    return useSWR(`${route}/MIN_SUBSCRIPTION_FEE`, fetcher);
}