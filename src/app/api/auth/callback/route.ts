import { useAppDispath } from "@/store/hooks";
import { setUser } from "@/store/slices/user.slice";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const token = searchParams.get("token");
        const userString = searchParams.get("user");
        const user = userString ? JSON.parse(userString) : null;

        if (!token) {
            return;
        }

        const response = new NextResponse();

        response.cookies.set("token", token);

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