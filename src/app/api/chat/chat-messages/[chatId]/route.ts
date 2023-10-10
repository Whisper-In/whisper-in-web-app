import { getChatMessages } from "@/server-services/chats/chats.server-service";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { chatId: string } }) {
    try {
        const { searchParams } = new URL(request.url);
        const pageIndex = searchParams.get("pageIndex") ?? "0";
        const messageCount = searchParams.get("messageCount") ?? "0";

        const result = await getChatMessages(params.chatId, pageIndex, messageCount);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}