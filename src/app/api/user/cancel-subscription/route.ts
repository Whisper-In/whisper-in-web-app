import * as userServerService from "@/server-services/user/user.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { profileId } = body;

        const result = await userServerService.cancelPaymentSubscription(profileId);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}