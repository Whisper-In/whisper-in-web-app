import useSWR from "swr";
import { fetcher } from "./fetcher";
import { IUserProfileDto } from "@/dtos/user/user.dtos";

const route = "/api/user";

export const useGetUserProfile = () => {
    return useSWR<IUserProfileDto>(route, fetcher, {
        revalidateOnFocus:true
    });
}