import * as postServerService from "@/server-services/content/post.server-service"
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
    try {        
        const result = await postServerService.deletePost(params.postId);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}