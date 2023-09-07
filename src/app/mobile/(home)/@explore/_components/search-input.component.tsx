"use client"

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default function SearchInput({ className, onInput }
    : { className?: string, onInput?: (event: React.FormEvent<HTMLInputElement>) => void }) {
    return (
        <div className={classNames(
            "flex items-center bg-background px-3 py-2 rounded-lg",
            className
        )}>
            <FontAwesomeIcon className="bg-background mr-3" icon={faSearch} fontSize={20} />
            <input className="grow bg-transparent outline-0" placeholder="Search" maxLength={50}
                onInput={onInput} />
        </div>
    );
}