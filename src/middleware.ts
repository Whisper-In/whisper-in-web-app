import { NextRequest, NextResponse, userAgent } from "next/server";
import { getCookieCallback } from "./utils/cookies.util";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    let pathName = request.nextUrl.pathname;

    if (!pathName.startsWith("/api")) {
        pathName = CheckTokenURL(pathName, token);

        pathName = CheckBrowser(pathName, request);
    }

    let response = NextResponse.next();

    if (request.nextUrl.pathname != pathName) {
        response = NextResponse.rewrite(new URL(pathName, request.nextUrl.origin));
    }

    if (token) {
        response.headers.append("Authorization", `Bearer ${token}`);
    }

    const callback = getCookieCallback(request.cookies);

    if (callback.status == "completed") {
        response.cookies.delete("callback");            
    }

    return response;
}

function CheckTokenURL(pathName: string, token?: string) {
    const paths = pathName.split("/");
    const lastPath = paths[paths.length - 1];

    if (!token && lastPath != "signin") {
        pathName = "signin"
    }

    return pathName;
}

function CheckBrowser(pathName: string, request: NextRequest) {
    const mobilePathName = "mobile"
    const firstPath = pathName.split("/")[1];
    const { device } = userAgent(request);
    const callback = getCookieCallback(request.cookies);

    if (device.type == "mobile" || callback.device == "mobile") {
        if (firstPath != mobilePathName) {
            pathName = pathName.replace(/^\/+/g, '');
            pathName = `/${mobilePathName}/${pathName}`;
        }
    } 
    else {
        pathName ="/"
    }
    // else if (firstPath == mobilePathName) {
    //     const newPathName = pathName.replace(`/${mobilePathName}`, "");
    //     pathName = `${newPathName}`;
    // }

    return pathName;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|.+.png|.+.js).*)',
    ]
}