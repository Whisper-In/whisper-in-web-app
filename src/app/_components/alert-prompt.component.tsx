"use client"

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export type AlertPromptType = {
    title?: string,
    message: string | React.ReactNode,
    showOk?: boolean,
    okText?: string,
    onOk?: () => void
    showCancel?: boolean,
    cancelText?: string,
    onCancel?: () => void,
    onClose?: () => void
}

const AlertPromptContext = createContext<{ promptAlert: (props: AlertPromptType) => void }>({
    promptAlert: () => { }
});

export function AlertPromptProvider({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const [props, setProps] = useState<AlertPromptType>({ message: "" });


    const promptAlert = (props: AlertPromptType) => {
        setIsOpen(true);
        setProps(props);
    }

    const _onClose = () => {
        setIsOpen(false);

        if (props.onClose) {
            props.onClose();
        }
    }

    return (
        <AlertPromptContext.Provider value={{ promptAlert }}>
            {children}
            <AlertPrompt
                open={isOpen}
                onClose={_onClose}
                title={props.title}
                message={props.message}
                showOk={props.showOk ?? true}
                okText={props.okText}
                onOk={props.onOk}
                showCancel={props.showCancel}
                cancelText={props.cancelText}
                onCancel={props.onCancel}
            />
        </AlertPromptContext.Provider>
    );
}

export const useAlertPrompt = () => useContext(AlertPromptContext);

export default function AlertPrompt({
    open,
    onClose,
    title,
    message,
    showOk = true,
    okText = "OK",
    onOk,
    showCancel,
    cancelText = "Cancel",
    onCancel
}: AlertPromptType & { open: boolean }) {
    const _onCancel = () => {
        if (onCancel) {
            onCancel();
        }

        if (onClose) {
            onClose();
        }
    }

    const _onOk = () => {
        if (onOk) {
            onOk();
        }

        if (onClose) {
            onClose();
        }
    }
    return (
        <Dialog open={open} onClose={onClose}>
            {
                title &&
                <DialogTitle>
                    {title}
                </DialogTitle>
            }
            <DialogContent>
                {message}
            </DialogContent>
            <DialogActions>
                {
                    showOk &&
                    <Button onClick={_onOk} aria-label="ok-button">
                        {okText}
                    </Button>
                }
                {
                    showCancel &&
                    <Button onClick={_onCancel} aria-label="cancel-button">
                        {cancelText}
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}