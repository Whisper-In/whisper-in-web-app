import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const response = NextResponse.redirect(`${process.env.SERVICE_URL}/auth/apple/web/login`);

        return response;
    } catch (error) {
        throw error;
    }
}