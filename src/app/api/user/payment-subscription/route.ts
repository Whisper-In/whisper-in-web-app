import * as userServerService from "@/server-services/user/user.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { tier, profileId } = body;

        const result = await userServerService.createPaymentSubscription(
            profileId, tier
        );

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}