import * as configServiceService from "@/server-services/business/config.server-services";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await configServiceService.getMinSubscriptionFee();

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}