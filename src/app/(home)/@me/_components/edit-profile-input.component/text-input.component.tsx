"use client"

import { Box, TextField, IconButton, FormControl } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"
import { grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { Validator } from "@/utils/form.util";
import { TextInputProps } from ".";

export default function TextInput(props: TextInputProps) {
    const ref = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | undefined>();

    const onClear = () => {
        if (ref.current) {
            ref.current.value = "";
        }

        if (props.onChange) {
            props.onChange(ref.current?.value);
        }
    }

    const validateInput = () => {
        setError(undefined);

        if (!props.required && !props.value) {
            return;
        }

        const error = Validator(props.value, props.validations);
        setError(error);
    }

    useEffect(() => {
        if (props.onError) {
            props.onError(error);
        }
    }, [error]);

    useEffect(() => {
        validateInput();
    }, [props.value]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mx: 2,
                mt: 2,
            }}>
            <TextField
                ref={ref}
                sx={{
                    width: "100%"
                }}
                variant="standard"
                inputProps={{
                    maxLength: props.maxLength,
                    min: props.min,
                    max: props.max,
                    step: 0.1,
                    style: {
                        paddingRight: 30
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={onClear}
                            aria-label="clear-button"
                            sx={{
                                color: grey[500]
                            }} >
                            <CancelIcon />
                        </IconButton>)
                }}
                autoComplete="off"
                type={(props.variant == "text" || props.variant == "text-field") ? "text" : props.variant}
                multiline={props.variant == "text-field"}
                minRows={1}
                maxRows={4}
                onChange={(e) => props.onChange && props.onChange(e.currentTarget.value)}
                value={props.value || ''}
                error={error != undefined}
                helperText={error} />

            {
                props.maxLength &&
                <Box aria-label="text-count" sx={{ alignSelf: "flex-end" }}>
                    {props.value?.length ?? 0}/{props.maxLength}
                </Box>
            }
        </Box>
    )
}