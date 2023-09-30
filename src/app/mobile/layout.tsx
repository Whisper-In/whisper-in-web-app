import { PropsWithChildren } from "react";

export default function MobileRootLayout(props
    : { modal: React.ReactNode } & PropsWithChildren) {
    return (
        <>
            {props.modal}
            {props.children}
        </>
    )
}