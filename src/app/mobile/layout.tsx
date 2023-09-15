import { PropsWithChildren } from "react";
import { ShareModalProvider } from "./_components/share-modal.component";
import { AlertPromptProvider } from "@/components/alert-prompt.component";
import { SpinnerProvider } from "@/components/spinner.component";

export default function MobileRootLayout(props
    : { modal: React.ReactNode } & PropsWithChildren) {
    return (
        <AlertPromptProvider>
            <SpinnerProvider>
                <ShareModalProvider>
                    {props.modal}
                    {props.children}
                </ShareModalProvider>
            </SpinnerProvider>
        </AlertPromptProvider>
    )
}