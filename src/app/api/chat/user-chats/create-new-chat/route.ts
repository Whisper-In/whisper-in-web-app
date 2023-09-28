import { NextRequest, NextResponse } from "next/server";
import * as chatsServerService from "@/server-services/chats/chats.server-service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { profileId } = body;

        const chatId = await chatsServerService.createNewChat(profileId);

        return NextResponse.json({ chatId });
    } catch (error) {
        throw error;
    }
}