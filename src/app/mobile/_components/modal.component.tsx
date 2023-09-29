"use client"

import { useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Modal({ children }: PropsWithChildren) {
    const theme = useTheme();

    return (
        <div style={{
            backgroundColor: theme.palette.background.paper
        }} className="fixed z-10 w-screen h-full overflow-auto">
            {children}
        </div>
    )
}