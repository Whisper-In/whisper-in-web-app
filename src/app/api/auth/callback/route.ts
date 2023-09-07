import { useAppDispath } from "@/store/hooks";
import { setUser } from "@/store/slices/user.slice";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const token = searchParams.get("token");
        const user = searchParams.get("user");

        if (!token || !user) {
            return;
        }

        const response = new NextResponse();

        response.cookies.set("token", token);
        response.cookies.set("user", user);

        if (request.cookies.has("callback")) {
            const callback = JSON.parse(request.cookies.get("callback")!.value);
            callback.status = "completed"
            response.cookies.set("callback", JSON.stringify(callback));
        }

        return response;
    } catch (error) {
        throw error;
    }
}