import { setCookieCallback } from "@/utils/cookies.util";
import { NextResponse, userAgent } from "next/server";

export async function GET(request: Request) {
    try {
        const response = NextResponse.redirect(`${process.env.SERVICE_URL}auth/google/web/login`);

        setCookieCallback(response, {
            device: userAgent(request).device.type,
            status: "in-progress"
        });

        return response;
    } catch (error) {
        throw error;
    }
}