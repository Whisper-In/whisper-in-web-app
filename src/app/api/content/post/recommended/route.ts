import { NextRequest } from "next/server";
import * as postExternalService from "@/external-services/content/post.external-service"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const filterPostIds = searchParams.get("filterPostIds")?.split(",");
    const showFollowingOnly = searchParams.get("showFollowingOnly") == "true";
    const size = parseInt(searchParams.get("size") ?? "0");

    try {
        const results = await postExternalService.getRecommendedPosts(size, filterPostIds, showFollowingOnly);

        return results;
    } catch (error) {
        throw error;
    }
}