"use client"

import { Box, CircularProgress, Stack, alpha } from "@mui/material";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

const SpinnerContext = createContext<{ isShowingSpinner: boolean, showSpinner: (isShow: boolean) => void }>({
    isShowingSpinner: false,
    showSpinner: () => { }
});

export function SpinnerProvider({ children }
    : PropsWithChildren) {
    const [isShow, setIsShow] = useState(false);

    return (
        <SpinnerContext.Provider value={{
            isShowingSpinner: isShow,
            showSpinner: (isShow) => setIsShow(isShow)
        }}>
            <Spinner show={isShow} />
            {children}
        </SpinnerContext.Provider>
    )
}

export const useSpinner = () => useContext(SpinnerContext);

export default function Spinner({ show }: { show: boolean }) {
    if (!show) {
        return null;
    }

    return (
        <Stack width="100vw"
            height="100vh"
            position="fixed"
            zIndex={99999}
            justifyContent="center"
            alignItems="center"
            sx={{
                backgroundColor: alpha("#000", 0.2),
            }}>
            <CircularProgress aria-busy={true} />
        </Stack >
    )
}