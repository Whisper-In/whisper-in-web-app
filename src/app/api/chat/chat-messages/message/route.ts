import { insertNewChatMessage } from "@/server-services/chats/chats.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { chatId, senderId, message } = body;

        const result = await insertNewChatMessage(chatId, senderId, message);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}