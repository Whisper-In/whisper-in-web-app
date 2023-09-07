import { NextRequest, NextResponse } from "next/server";
import * as postServerService from "@/server-services/content/post.server-service"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);    

    const filterPostIds = searchParams.get("filterPostIds")?.split(",");
    const showFollowingOnly = searchParams.get("showFollowingOnly") == "true";
    const size = parseInt(searchParams.get("size") ?? "0");    
    
    try {
        const results = await postServerService.getRecommendedPosts(size, filterPostIds, showFollowingOnly);

        return NextResponse.json(results);
    } catch (error) {
        throw error;
    }
}