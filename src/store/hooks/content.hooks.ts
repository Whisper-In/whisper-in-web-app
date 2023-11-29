import useSWRInfinite from "swr/infinite";
import { fetcher } from "./fetcher";
import { IPostDto } from "@/dtos/content/post.dtos";

const route = "/api/content/posts";

const getRecommendedPostsKey = (pageIndex: number, previousData: IPostDto[], params: URLSearchParams) => {
    params.append("page", pageIndex.toString());

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
            keepPreviousData: true
        }
    );
}