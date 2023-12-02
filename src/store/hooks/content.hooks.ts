import useSWRInfinite from "swr/infinite";
import { fetcher, getKey } from "./fetcher";
import { IPostDto } from "@/dtos/content/post.dtos";
import useSWR from "swr";

const route = "/api/content/posts";

export const useGetRecommendedPosts = (size: number, showFollowingOnly?: boolean) => {
    const params = new URLSearchParams({
        size: size.toString()
    });

    if (showFollowingOnly != undefined) {
        params.append("showFollowingOnly", `${showFollowingOnly}`)
    }

    return useSWRInfinite<IPostDto[]>(
        (pageIndex, previousData) => getKey(`${route}/recommended`, pageIndex, previousData, params),
        fetcher,
        {
            revalidateFirstPage: false,
            revalidateAll: false,
            revalidateOnFocus: false,
        });
}

export const useGetPosts = (profileId: string | undefined, postType: string, itemsPerLoad: number) => {
    const params = new URLSearchParams({
        postType,
        itemsPerLoad: itemsPerLoad.toString()
    });

    if (profileId) {
        params.append("profileId", profileId);
    }

    return useSWRInfinite<IPostDto[]>(
        (pageIndex, previousData) => getKey(route, pageIndex, previousData, params),
        fetcher,
        {
            revalidateAll: false
        }
    )
}

export const useGetPostDetails = (postId: string) => {
    return useSWR<IPostDto>(`${route}/details/${postId}`, fetcher);
}
