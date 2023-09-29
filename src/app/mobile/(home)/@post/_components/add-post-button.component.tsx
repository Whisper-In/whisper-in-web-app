"use client"

import { AddAPhoto } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ChangeEventHandler, useRef } from "react";

export default function AddPostButton({ onChange }
    : { onChange?: ChangeEventHandler<HTMLInputElement> }) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <AddAPhoto sx={{ fontSize: 60 }} />

            <Button variant="outlined" onClick={() => inputRef.current?.click()}>
                Upload
            </Button>

            <input ref={inputRef}
                type="file"
                accept="image/*,video/*"
                hidden={true}
                onChange={onChange} />
        </>
    );
}