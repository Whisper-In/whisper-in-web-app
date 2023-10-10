import { setChatAudioReply } from "@/server-services/chats/chats.server-service";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { chatId: string } }) {
    try {
        const { isAudioOn } = await request.json();        

        const result = await setChatAudioReply(params.chatId, isAudioOn);
        
        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
} 