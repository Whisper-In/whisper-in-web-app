import * as elevenLabsService from "@/server-services/chats/eleven-labs.server-services"
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { aiProfileId: string } }) {
    try {
        const body = await request.json();

        const { text } = body;

        const result = await elevenLabsService.getTextToSpeech(params.aiProfileId, text);

        const headers = new Headers();
        headers.set("Content-Type", "audio/mpeg");

        return new NextResponse(result, { headers });
    } catch (error) {
        throw error;
    }
}