import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"
import { NextResponse } from "next/server";

export type Callback = { device?: string, status?: string };

export const setCookieCallback = (response: NextResponse, callback: Callback) => {
    response.cookies.set("callback", JSON.stringify(callback));
}

export const getCookieCallback = (cookies: RequestCookies): Callback => {
    if (cookies.has("callback")) {
        const callback = JSON.parse(cookies.get("callback")!.value);

        return callback;
    }

    return {};
}