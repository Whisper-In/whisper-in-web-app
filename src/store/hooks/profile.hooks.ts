import useSWR from "swr";
import { fetcher } from "./fetcher";
import { IProfileDto } from "@/dtos/profile/profile.dtos";

const route = "/api/profile";

export const useGetProfile = (profileId: string) => {
    return useSWR<IProfileDto>(`${route}/${profileId}`, fetcher);
}