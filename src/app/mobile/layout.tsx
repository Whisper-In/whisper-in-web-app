"use client"

import { PropsWithChildren, createContext, useContext, useState } from "react";
import ShareModal, { ShareModalContext, ShareModalProvider, useShareModal } from "./_components/share-modal.component";

export default function MobileRootLayout({ children }: PropsWithChildren) {
    return (
        <ShareModalProvider>
            {children}
        </ShareModalProvider>
    )
}