import { IPostDto } from "@/external-dtos/content/post.external-dtos";
import axiosInstance from "@/external-services/axios";

export async function getRecommendedPosts(size: number, filterPostIds?: string[], showFollowingOnly?: boolean) {
    try {
        const results = await axiosInstance.get("/content/posts/recommended", {
            params: {
                size,
                filterPostIds,
                showFollowingOnly
            }
        });

        return results.data as IPostDto[];
    } catch (error) {
        throw error;
    }
}