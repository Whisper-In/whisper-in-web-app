"use client"

import classNames from "classnames";
import { PropsWithChildren, forwardRef, useEffect, useImperativeHandle, useState } from "react";

export type MobileModalType = {
    prompt: () => void;
    close: () => void;
}

const MobileModal = forwardRef(({ className, children, onChange }
    : { className?: string, onChange?: (isShowing: boolean) => void } & PropsWithChildren, ref) => {
    const [isShowing, setIsShowing] = useState(false);

    useImperativeHandle(ref, () => ({
        prompt: () => {
            setIsShowing(true);
        },
        close: () => {
            setIsShowing(false);
        }
    }));

    useEffect(() => {
        if (onChange) {
            onChange(isShowing);
        }
    }, [isShowing]);

    return (
        <div className={classNames(
            className,
            "fixed left-0 bottom-0 bg-black/30 h-full w-full overflow-hidden z-10 transition-all",
            {
                "opacity-100": isShowing,
                "opacity-0": !isShowing,
                "pointer-events-none": !isShowing
            }
        )} onClick={() => setIsShowing(false)}>
            <div className={classNames(
                "absolute bottom-0 left-0 bg-surface w-full p-5 transition-all",
                {
                    "translate-y-0": isShowing,
                    "translate-y-full": !isShowing,
                }
            )}>
                {children}
            </div>
        </div>
    )
});

export default MobileModal;