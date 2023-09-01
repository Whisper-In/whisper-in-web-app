"use client"

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { forwardRef, useImperativeHandle, PropsWithRef, useState } from "react";

export type LikePromptType = {
    prompt: () => void
}

const LikePrompt = forwardRef(({ className, size = 120 }
    : { className?: string, size?: number }, ref) => {

    const [isPrompted, setIsPrompted] = useState(false);
    const delay = 750;

    useImperativeHandle(ref, () => ({
        prompt() {
            if (isPrompted)
                return;

            setIsPrompted(true);
            setTimeout(() => setIsPrompted(false), delay);
        }
    }));

    return (
        <FontAwesomeIcon className={classNames(
            "text-rose-600 transition-all duration-200",
            className,
            {
                "opacity-0 scale-0": !isPrompted,
                "opacity-100 scale-100": isPrompted
            }
        )} icon={faHeart} fontSize={size} />
    );
});

export default LikePrompt;