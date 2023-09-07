import { NextRequest, NextResponse } from "next/server";
import * as postExternalService from "@/server-services/content/post.server-service"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const profileId = searchParams.get("profileId")!;
    const postType = searchParams.get("postType")!;
    const pageIndex = parseInt(searchParams.get("pageIndex")!);
    const itemsPerLoad = parseInt(searchParams.get("itemsPerLoad")!);

    try {
        const results = await postExternalService.getPosts(profileId, postType, pageIndex, itemsPerLoad);

        return NextResponse.json(results);
    } catch (error) {
        throw error;
    }
}