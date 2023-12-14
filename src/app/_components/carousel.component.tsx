"use client"

import { isScrollEnded } from "@/utils/component.util";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";

const debugMode = false;

export default function Carousel<T>({
    className,
    direction = "x",
    children,
    onSrollEnd
}: {
    className?: string,
    direction?: "x" | "y",
    children: React.ReactElement[],
    onSrollEnd?: () => void
}) {
    const [debugText, setDebugText] = useState("");

    const onSroll = (event: React.UIEvent<HTMLDivElement>) => {
        setDebugText(`Carousell Scroll: ${event.currentTarget.scrollTop}/${event.currentTarget.scrollHeight}`);

        if (onSrollEnd) {
            if (isScrollEnded(event)) {
                setDebugText("Carousell Scroll Ended");
                onSrollEnd();
            }
        }
    }

    return (
        <div aria-label="carousel"
            onScroll={onSroll}
            className={classNames(
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

            {
                debugMode &&
                <Typography sx={{
                    position: "fixed",
                    top: 10,
                    left: 10
                }}>
                    {debugText}
                </Typography>
            }
        </div>
    );
}