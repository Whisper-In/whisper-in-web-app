import * as userServerService from "@/server-services/user/user.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { profileId, tier } = body;

        const result = await userServerService.createPaymentSheet(
            profileId, tier,
        );

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}