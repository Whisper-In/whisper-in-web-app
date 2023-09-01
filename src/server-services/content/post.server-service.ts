import { IPostDto } from "@/server-dtos/content/post.server-dtos";
import axiosInstance from "@/server-services/axios";

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

export async function likePost(postId: string) {
    try {
        const result = await axiosInstance.post("/content/posts/like", { postId });

        return result.data as { isLiked: boolean, likeCount: number }
    } catch (error) {
        throw error;
    }
}