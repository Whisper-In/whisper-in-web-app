import { IDeletedResultDto, IPostDto, IPostResultsDto } from "@/dtos/content/post.dtos";
import axiosInstance from "@/server-services/axios";

const route = "/content/posts";

export async function getRecommendedPosts(size: number, filterPostIds?: string[], showFollowingOnly?: boolean) {
    try {
        const results = await axiosInstance.get(`${route}/recommended`, {
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
        const result = await axiosInstance.post(`${route}/like`, { postId });

        return result.data as { isLiked: boolean, likeCount: number }
    } catch (error) {
        throw error;
    }
}

export async function getPosts(profileId: string, postType: string, pageIndex: number, itemsPerLoad: number) {
    try {
        const results = await axiosInstance.get(`${route}`, { params: { profileId, pageIndex, itemsPerLoad, postType } });

        return results.data as IPostResultsDto
    } catch (error) {
        throw error;
    }
}

export const getPostDetails = async (postId: string) => {
    try {
        const result = await axiosInstance.get(`${route}/details/${postId}`);

        return result.data as IPostDto;
    } catch (error) {
        throw error;
    }
}

export const createPost = async (formData: FormData) => {
    try {
        const result = await axiosInstance.post(route,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        return result.data as IPostDto;
    } catch (error) {
        throw error;
    }
}

export const deletePost = async (postId: string) => {
    try {
        const result = await axiosInstance.delete(`${route}/${postId}`);

        return result.data as IDeletedResultDto;
    } catch (error) {
        throw error;
    }
}
