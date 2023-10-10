import { getChatCompletion } from "@/server-services/chats/chats.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { chatId, profileId, message } = await request.json();

        const result = await getChatCompletion(chatId, profileId, message);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}