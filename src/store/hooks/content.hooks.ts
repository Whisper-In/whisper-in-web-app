import useSWRInfinite from "swr/infinite";
import { fetcher } from "./fetcher";
import { IPostDto } from "@/dtos/content/post.dtos";
import useSWR from "swr";

const route = "/api/content/posts";

const getKey = <T>(url: string, pageIndex: number, previousData: T[], params: URLSearchParams) => {
    if (previousData && !previousData.length) return null;

    if (params.has("pageIndex")) {
        params.set("pageIndex", pageIndex.toString());
    } else {
        params.append("pageIndex", pageIndex.toString());
    }

    return `${url}?${params}`;
}

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
            revalidateAll: false,
            revalidateOnFocus: false,
            revalidateIfStale: false
        });
}

export const useGetPosts = (profileId: string, postType: string, itemsPerLoad: number) => {
    const params = new URLSearchParams({
        profileId,
        postType,
        itemsPerLoad: itemsPerLoad.toString()
    });

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
