"use client"

import { isMobile } from "@/utils/mobile.util";
import { useEffect } from "react";
import { useToast } from "./toast.component";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLastDesktopPrompt } from "@/store/slices/app.slice";

const DESKTOP_PROMPT_INTERVAL = 600000

export default function DesktoViewPrompt() {
    const { showToast } = useToast();
    const lastDesktopPrompt = useAppSelector((state) => state.app.lastDesktopPrompt) || 0;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (lastDesktopPrompt) {
            const now = Date.now();

            if (now - lastDesktopPrompt > DESKTOP_PROMPT_INTERVAL) {
                if (!isMobile(navigator.userAgent)) {
                    showToast({
                        message: "View it on your mobile device for the better viewing experience."
                    });

                    dispatch(setLastDesktopPrompt(Date.now()));
                }
            }
        }
    }, [lastDesktopPrompt]);

    return null;
}