"use client"

import { Container, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Modal({ children }: PropsWithChildren) {
    return (
        <Container sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            position: "fixed",
            zIndex: (theme) => theme.zIndex.modal,
            overflow: "hidden",
            height: "100%"
        }}>
            {children}
        </Container>
    )
}