import { Paper, useTheme } from "@mui/material";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export function MessageBubbleWrapper({ className, isPrimary, children }: { className?: string, isPrimary?: boolean } & PropsWithChildren) {
    const theme = useTheme();

    return (
        <Paper className={classNames(            
            className,
        )} sx={{
            padding: 1,
            borderRadius: 5,
            borderTopLeftRadius: !isPrimary ? 0 : undefined,
            borderBottomRightRadius: isPrimary ? 0 :undefined,
            alignSelf: isPrimary ? "flex-end" : "flex-start",
            backgroundColor: isPrimary ? theme.palette.primary.main : theme.palette.container.main,
            color: isPrimary ? theme.palette.primary.contrastText : theme.palette.container.contrastText
        }}>
            {children}
        </Paper>
    );
}