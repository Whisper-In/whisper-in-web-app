import { IPostDto } from "@/server-dtos/content/post.server-dtos";
import axios from "axios";

export async function getRecommendedPosts(size: number, filterPostIds?: string[], showFollowingOnly?: boolean) {
    try {
        const results = await axios.get("/api/content/post/recommended", {
            params: {
                size,
                filterPostIds: filterPostIds?.join(),
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
        const results = await axios.post("/api/content/post/like", { postId });

        return results.data as { isLiked: boolean, likeCount: number };
    } catch (error) {
        throw error;
    }
}