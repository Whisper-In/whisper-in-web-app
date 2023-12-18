"use client"

import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import classNames from "classnames";

export default function SearchInput({ className, onChange }
    : { className?: string, onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) {

    return (
        <div className={classNames(
            "px-3 py-2",
            className
        )}>
            <TextField
                variant="standard"
                placeholder="Search"
                fullWidth={true}
                inputProps={{
                    maxLength: 50
                }}
                onChange={onChange}
                InputProps={{
                    startAdornment: <Search sx={{ m: 1 }} />
                }}
            />
        </div>
    );
}