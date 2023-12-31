import { UserProfile } from "@/store/types/user.types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
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

export const getUser = (cookies: RequestCookies | ReadonlyRequestCookies): UserProfile | null => {
    if (cookies.has("user")) {
        const user = JSON.parse(cookies.get("user")!.value);

        return user;
    }

    return null;
}

export const convertClientCookieToObject = (cookies?: string) => {
    const cookiesArray = cookies?.split(";");    
    const cookiesObject: { [key: string]: string } = {}

    cookiesArray?.forEach((cookie) => {
        if(!cookie.length) {
            return;
        }

        const split = cookie.split("=");

        const key = split[0].trim();
        let value = split[1].trim();

        try {
            const decode = decodeURIComponent(value);
            value = JSON.parse(decode);
        } catch (error) {

        }

        cookiesObject[key] = value;
    });

    return cookiesObject;
}