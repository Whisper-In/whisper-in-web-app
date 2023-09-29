import { PropsWithChildren, useMemo, useState } from "react";
import { ShareModalProvider } from "./_components/share-modal.component";
import { AlertPromptProvider } from "@/components/alert-prompt.component";
import { SpinnerProvider } from "@/components/spinner.component";
import { ToastProvider } from "@/components/toast.component";

export default function MobileRootLayout(props
    : { modal: React.ReactNode } & PropsWithChildren) {
    return (
        <ToastProvider>
            <AlertPromptProvider>
                <SpinnerProvider>
                    <ShareModalProvider>
                        {props.children}
                        {props.modal}
                    </ShareModalProvider>
                </SpinnerProvider>
            </AlertPromptProvider>
        </ToastProvider>
    )
}