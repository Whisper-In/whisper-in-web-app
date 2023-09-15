import * as paymnetServerService from "@/server-services/payment/payment.server-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, metadata, customerStripeId } = body;

        const result = await paymnetServerService.createSubscriptionPaymentSheet(
            amount,
            metadata,
            customerStripeId
        )

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}