import { NextRequest, NextResponse, userAgent } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const token = searchParams.get("token");
        const user = searchParams.get("user");

        const newURL = new URL('/callback', url.origin);

        if (user) {
            newURL.searchParams.append("user", user);
        }

        if(token) {
            newURL.searchParams.append("token", token);
        }

        const response = NextResponse.redirect(newURL);

        if (token) {
            response.cookies.set("token", token);
        }

        return response;
    } catch (error) {
        throw error;
    }
}