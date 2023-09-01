"use client"

import classNames from "classnames";
import { PropsWithChildren, useState } from "react";

enum Direction {
    x, y
}

export default function Carousel<T>({ className, direction = "x", children, onSrollEnd }
    : {
        className?: string, direction?: "x" | "y",
        children: React.ReactElement[], onSrollEnd?: () => void
    }) {
    const onSroll = (event: React.UIEvent<HTMLDivElement>) => {
        if (onSrollEnd) {   
            const currentScroll = Math.round(event.currentTarget.scrollTop + event.currentTarget.clientHeight);         
            if (currentScroll >= event.currentTarget.scrollHeight) {
                onSrollEnd();
            }
        }
    }

    return (
        <div onScroll={onSroll} className={classNames(
            className,
            "snap-mandatory h-full",
            {
                "overflow-y-scroll snap-y": direction == "y",
                "overflow-x-scroll snap-x": direction == "x"
            }
        )}>
            {
                children.map((child, index) =>
                    <div key={index} className="w-full h-full snap-always snap-center">
                        {child}
                    </div>)
            }
        </div>
    );
}