import { IDeletedResultDto, IPostDto, IPostResultsDto } from "@/dtos/content/post.dtos";
import axios from "axios";

const route = "/api/content/post";

export async function getRecommendedPosts(size: number, filterPostIds?: string[], showFollowingOnly?: boolean) {
    try {
        const results = await axios.get(`${route}/recommended`, {
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
        const results = await axios.post(`${route}/like`, { postId });

        return results.data as { isLiked: boolean, likeCount: number };
    } catch (error) {
        throw error;
    }
}

export async function getPosts(profileId: string, postType: string, pageIndex: number, itemsPerLoad: number) {
    try {
        const results = await axios.get(`${route}`, {
            params: {
                profileId,
                postType,
                pageIndex,
                itemsPerLoad
            }
        });

        return results.data as IPostResultsDto;
    } catch (error) {
        throw error;
    }
}

export const getPostDetails = async (postId: string) => {
    try {
        const result = await axios.get(`${route}/details/${postId}`);

        return result.data as IPostDto;
    } catch (error) {
        throw error;
    }
}

export const createPost = async (file: File, description?: string) => {
    try {
        const formData = new FormData();
        formData.append("post", file);

        if (description) {
            formData.append("description", description);
        }

        const result = await axios.post(route, formData);

        return result.data as IPostDto;
    } catch (error) {
        throw error;
    }
}

export const deletePost = async (postId: string) => {
    try {
        const result = await axios.delete(`${route}/${postId}`);

        return result.data as IDeletedResultDto;
    } catch (error) {
        throw error;
    }
}
