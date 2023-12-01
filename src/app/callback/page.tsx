"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams.has("user") || !searchParams.has("token")) {
            window.opener.postMessage({signin_status:"FAILED"}, `${location.origin}`);
        } else {
            const userString = searchParams.get("user")!;
            const user = JSON.parse(userString);

            const message = {
                signin_status: "SUCCESS",
                user                
            }

            window.opener.postMessage(message, `${location.origin}/signin`);
        }
    }, []);

    return null;
}