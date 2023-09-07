import { NextRequest, NextResponse } from "next/server";
import * as profileServerService from "@/server-services/profile/profile.server-service"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query")

    if (!query?.length) {
        return NextResponse.json({});
    }

    try {
        const results = await profileServerService.searchProfiles(query);

        return NextResponse.json(results);
    } catch (error) {
        throw error;
    }
}