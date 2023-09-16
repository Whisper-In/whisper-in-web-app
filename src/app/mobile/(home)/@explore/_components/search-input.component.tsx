"use client"

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@mui/material";
import classNames from "classnames";

export default function SearchInput({ className, onInput }
    : { className?: string, onInput?: (event: React.FormEvent<HTMLInputElement>) => void }) {
    return (
        <div className={classNames(
            "flex items-center px-3 py-2 rounded-lg",
            className
        )}>
            <FontAwesomeIcon className="mr-3" icon={faSearch} fontSize={20} />

            <Input
                placeholder="Search"
                fullWidth={true}
                inputProps={{
                    maxLength: 50,
                    onInput
                }}
            />
        </div>
    );
}