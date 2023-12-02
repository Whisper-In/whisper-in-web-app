"use client"

import { isMobile } from "@/utils/mobile.util";
import { useEffect } from "react";
import { useToast } from "./toast.component";

export default function DesktoViewPrompt() {
    const { showToast } = useToast();

    useEffect(() => {
        if (!isMobile(navigator.userAgent)) {
            showToast({
                message: "View it on your mobile device for a better viewing experience."
            });
        }
    }, []);

    return null;
}