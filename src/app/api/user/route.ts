import * as userServerService from "@/server-services/user/user.server-service"; import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const result = await userServerService.getUserProfile();

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}

export async function PUT(request: Request) {
    try {
        const profile = await request.json();        

        const result = await userServerService.updateUserProfile(profile);
        
        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }
}