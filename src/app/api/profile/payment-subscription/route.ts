import * as profileServerService from "@/server-services/profile/profile.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { amount, metadata } = body;

        const result = await profileServerService.createPaymentSubscription(
            amount,
            metadata
        );

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}