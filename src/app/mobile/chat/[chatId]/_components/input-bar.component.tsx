"use client"

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Snackbar, useTheme } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

export default function ChatInputBar({ onChange, onSend }
    : { onChange?: (input: string) => void, onSend?: (input: string | undefined) => void }) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [initialTextAreaHeight] = useState(0);
    const theme = useTheme();

    const updateTextAreaHeight = (target: HTMLTextAreaElement) => {
        target.style.height = `${initialTextAreaHeight}px`
        target.style.height = `${target.scrollHeight}px`
    }

    const _onSend = () => {
        if (textAreaRef.current) {
            if (onSend) {
                onSend(textAreaRef.current.value);
            }

            textAreaRef.current.value = "";

            updateTextAreaHeight(textAreaRef.current)
        }
    }

    return (
        <>
            <div className="flex px-2 py-3 gap-3 items-end">
                <Input ref={textAreaRef}
                    fullWidth={true}
                    multiline={true}
                    minRows={1}
                    maxRows={4}
                    disableUnderline={true}
                    sx={{
                        borderRadius: 5,
                        padding: 1.5
                    }}
                />

                <button onClick={_onSend} className="rounded-full p-2 w-[40px] h-[40px]" style={{
                    backgroundColor: theme.palette.primary.main
                }}>
                    <FontAwesomeIcon style={{ color: theme.palette.primary.contrastText }} icon={faArrowUp} />
                </button>
            </div>
        </>
    )
}