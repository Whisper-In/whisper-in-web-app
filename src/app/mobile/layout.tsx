import { PropsWithChildren } from "react";
import { ShareModalProvider } from "./_components/share-modal.component";

export default function MobileRootLayout(props
    : { modal: React.ReactNode } & PropsWithChildren) {
    return (
        <ShareModalProvider>
            {props.modal}
            {props.children}
        </ShareModalProvider>
    )
}