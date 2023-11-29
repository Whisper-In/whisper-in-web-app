"use client"

import { CircularProgress } from "@mui/material";
import { PropsWithChildren, createContext, useContext, useState } from "react";

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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/30 z-[99999]">
            <CircularProgress size={60} />
        </div>
    )
}