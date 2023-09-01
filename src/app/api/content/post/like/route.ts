import { likePost } from "@/server-services/content/post.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await likePost(body.postId);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}