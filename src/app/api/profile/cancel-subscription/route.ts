import * as profileServerService from "@/server-services/profile/profile.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { userId, aiProfileId } = body;

        const result = await profileServerService.cancelPaymentSubscription(
            userId,
            aiProfileId
        );

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}