import { NextRequest, NextResponse } from "next/server";
import * as chatsServerService from "@/server-services/chats/chats.server-service";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    const { searchParams } = new URL(request.url);

    try {
        const results = await chatsServerService.getUserChats(params.userId);

        return NextResponse.json(results);
    } catch (error) {
        throw error;
    }
}