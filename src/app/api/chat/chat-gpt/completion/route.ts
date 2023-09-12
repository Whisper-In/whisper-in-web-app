import * as chatGPTServerService from "@/server-services/chats/chat-gpt.server-services"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const aiProfileId = body.aiProfileId;
    const message = body.message;
    const prevMessages = body.prevMessages;

    try {
        const result = await chatGPTServerService.getChatCompletion(aiProfileId, message, prevMessages);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}