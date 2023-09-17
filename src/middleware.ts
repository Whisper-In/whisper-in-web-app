import { NextRequest, NextResponse, userAgent } from "next/server";
import { getCookieCallback } from "./utils/cookies.util";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const searchParams = request.nextUrl.searchParams;
    let initialPathName = request.nextUrl.pathname;

    if (!initialPathName.startsWith("/api")) {
        request.nextUrl.pathname = CheckTokenURL(request.nextUrl.pathname, token);

        request.nextUrl.pathname = CheckBrowser(request);
    }

    let response = NextResponse.next();

    if (request.nextUrl.pathname != initialPathName) {
        const newURL = new URL(request.nextUrl.pathname, request.nextUrl.origin)
        searchParams.forEach((value, key) => {
            newURL.searchParams.append(key, value);
        });

        response = NextResponse.redirect(newURL);
    }

    if (token) {
        response.headers.append("Authorization", `Bearer ${token}`);
    }

    return response;
}

function CheckTokenURL(pathName: string, token?: string) {
    const paths = pathName.split("/");
    const lastPath = paths[paths.length - 1];

    if (!token && !["signin", "callback"].includes(lastPath)) {
        pathName = "signin"
    } else if (token && lastPath == "signin") {
        pathName = "/"
    }

    return pathName;
}

function CheckBrowser(request: NextRequest) {
    let pathName = request.nextUrl.pathname;
    const mobilePathName = "mobile"
    const firstPath = pathName.split("/")[1];
    const { device } = userAgent(request);

    if (device.type == "mobile") {
        if (firstPath != mobilePathName) {
            pathName = pathName.replace(/^\/+/g, '');
            pathName = `/${mobilePathName}/${pathName}`;
        }
    }
    else {
        if (firstPath == mobilePathName) {
            pathName = pathName.replaceAll(`/${mobilePathName}`, "");
        }
    }

    return pathName;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|.+.png|.+.js).*)',
    ]
}