"use client"

import { AppBar, Box, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import classNames from "classnames";

export default function Header({
    children,
    title,
    titleAlignment,
    leftComponent,
    rightComponent
}: {
    title?: string,
    titleAlignment?: "start" | "center" | "end",
    leftComponent?: React.ReactNode,
    rightComponent?: React.ReactNode,
} & React.PropsWithChildren) {
    return (
        <AppBar
            position="sticky"
            className="pt-sat"
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                minHeight: 88,
                paddingBottom: 2,
                paddingRight: 2,
                paddingLeft: 2,
                gap: 3,
                zIndex: 1,
            }}>
            {
                children ?
                    children
                    :
                    <Stack direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        spacing={2}>
                        {leftComponent}
                        
                        <label className={classNames(
                            "font-bold text-xl grow",
                            {
                                "text-center": titleAlignment == "center",
                                "text-left": titleAlignment == "start",
                                "text-right": titleAlignment == "end"
                            }
                        )}>
                            {title}
                        </label>

                        {rightComponent}
                    </Stack>
            }
        </AppBar>
    );
}