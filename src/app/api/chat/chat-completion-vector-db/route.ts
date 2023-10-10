import { getChatCompletionWithVectorDB } from "@/server-services/chats/chats.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { chatId, recipientUserId, message } = await request.json();

        const result = await getChatCompletionWithVectorDB(chatId, recipientUserId, message);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}