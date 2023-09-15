import * as paymnetServerService from "@/server-services/payment/payment.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { stripeSubscriptionId } = body;

        const result = await paymnetServerService.cancelSubscription(stripeSubscriptionId);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}