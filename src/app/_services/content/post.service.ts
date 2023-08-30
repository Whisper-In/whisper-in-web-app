import { IPostDto } from "@/external-dtos/content/post.external-dtos";
import axios from "axios";

export async function getRecommendedPosts(size: number, filterPostIds?: string[], showFollowingOnly?: boolean) {
    try {        
        const results = await axios.get("/api/content/post/recommended", {
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