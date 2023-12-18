"use client"

import { AddAPhoto } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { ChangeEventHandler, useRef } from "react";

export default function AddPostButton({ onChange }
    : { onChange?: ChangeEventHandler<HTMLInputElement> }) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Stack alignItems="center" gap={1}>
            <AddAPhoto sx={{ fontSize: 60, opacity: 0.3 }} />

            <Button variant="outlined"
                aria-label="upload-button"
                onClick={() => inputRef.current?.click()}>
                Upload
            </Button>

            <input ref={inputRef}
                aria-label="file-input"
                type="file"
                accept="image/*,video/*"
                hidden={true}
                onChange={onChange} />
        </Stack>
    );
}