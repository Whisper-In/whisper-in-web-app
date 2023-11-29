import useSWRInfinite from "swr/infinite";
import { fetcher } from "./fetcher";
import { IPostDto } from "@/dtos/content/post.dtos";

const route = "/api/content/posts";

const getRecommendedPostsKey = (page: number, previousData: IPostDto[], params: URLSearchParams) => {
    if (previousData && !previousData.length) return null;

    if (params.has("page")) {
        params.set("page", page.toString());
    } else {
        params.append("page", page.toString());
    }

    return `${route}/recommended?${params}`;
}

export const useGetRecommendedPosts = (size: number, showFollowingOnly?: boolean) => {
    const searchParams = new URLSearchParams({
        size: size.toString()
    });

    if (showFollowingOnly != undefined) {
        searchParams.append("showFollowingOnly", `${showFollowingOnly}`)
    }

    return useSWRInfinite<IPostDto[]>(
        (pageIndex, previousData) => getRecommendedPostsKey(pageIndex, previousData, searchParams),
        fetcher,
        {
            revalidateAll: false
        });
}