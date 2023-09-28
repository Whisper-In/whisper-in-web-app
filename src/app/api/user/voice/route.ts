import * as userServerService from "@/server-services/user/user.server-service";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const formData = await request.formData();

        const result = await userServerService.updateUserVoice(formData);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}