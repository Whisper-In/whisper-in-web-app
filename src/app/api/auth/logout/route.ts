import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    const response = NextResponse.redirect(new URL("signin", request.nextUrl.origin));

    response.cookies.delete("token");

    return response;
}