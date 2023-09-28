"use client"

import { useAppSelector } from "@/store/hooks";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                    maxLength: 50,
                }}
                onChange={onChange}
                InputProps={{
                    startAdornment: <FontAwesomeIcon className="mr-3" icon={faSearch} fontSize={20} />
                }}
            />
        </div>
    );
}