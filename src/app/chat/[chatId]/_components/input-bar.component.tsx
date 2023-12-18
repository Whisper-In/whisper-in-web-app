"use client"

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";

export default function ChatInputBar({ onChange, onSend }
    : { onChange?: (input: string) => void, onSend?: (input: string | undefined) => void }) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const theme = useTheme();

    const _onSend = () => {
        if (textAreaRef.current) {
            if (onSend) {
                onSend(textAreaRef.current.value);
            }

            textAreaRef.current.value = "";
        }
    }

    return (
        <div className="flex px-2 py-3 pb-sab-pr-14 gap-3 items-end">
            <Input inputRef={textAreaRef}
                inputProps={{
                    "aria-label": "chat-input"
                }}
                fullWidth={true}
                multiline={true}
                minRows={1}
                maxRows={4}
                disableUnderline={true}
                sx={{
                    minHeight: 40,
                    borderRadius: 5,
                    paddingX: 2,
                    backgroundColor: theme.palette.container.main
                }}
            />

            <button aria-label="send-button" onClick={_onSend} className="rounded-full aspect-square min-w-[40px] h-[40px]" style={{
                backgroundColor: theme.palette.primary.main
            }}>
                <FontAwesomeIcon style={{ color: theme.palette.primary.contrastText }} icon={faArrowUp} />
            </button>
        </div>
    )
}