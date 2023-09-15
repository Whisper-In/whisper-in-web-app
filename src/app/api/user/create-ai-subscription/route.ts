import * as userServerService from "@/server-services/user/user.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { userId, aiProfileId, tier, subscriptionId } = body;

        const result = await userServerService.createUserAISubscription(
            userId,
            aiProfileId,
            tier,
            subscriptionId
        );        

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}