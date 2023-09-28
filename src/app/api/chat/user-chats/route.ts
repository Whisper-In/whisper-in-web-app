import { NextRequest, NextResponse } from "next/server";
import * as chatsServerService from "@/server-services/chats/chats.server-service";

export async function GET(request: NextRequest) {
    try {
        const results = await chatsServerService.getUserChats();

        return NextResponse.json(results);
    } catch (error) {
        throw error;
    }
}