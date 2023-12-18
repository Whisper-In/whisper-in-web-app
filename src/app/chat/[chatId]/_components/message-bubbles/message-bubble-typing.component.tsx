"use client"

import { animated, useSpringValue } from "@react-spring/web";
import { useEffect } from "react";
import { MessageBubbleWrapper } from "./message-bubble-wrapper.component";

export function MessageBubbleTyping({ isUser }: { isUser?: boolean }) {
    const dotCount = 3;
    const dotRadius = 3;
    const gap = 5;
    const padding = 5;
    const bottomPadding = 10
    const height = 25;
    const width = dotRadius * 2 * dotCount + (gap * dotCount - 2) + padding * 2

    const angle = useSpringValue(Math.PI * 2);

    useEffect(() => {
        angle.start(0, {
            loop: true,
            config: {
                duration: 1200
            }
        });
    }, []);

    const defaultCY = height - dotRadius * 2 - bottomPadding;
    const dotGap = (dotRadius * 2 + gap);
    const defaultCX = dotRadius + padding;

    const getCY = (value: number, idx: number) => {
        const offsetAngle = Math.PI / 2;
        const offset = idx * offsetAngle;
        return (Math.sin(value + offset) + 1) / 2 * defaultCY + dotRadius + padding;
    }

    return (
        <MessageBubbleWrapper isPrimary={isUser}>
            <svg width={width} height={height} fill="grey" aria-label="typing">
                {
                    [...Array.from(Array(dotCount).keys())].map((idx) =>
                        <animated.circle
                            key={idx}
                            cx={defaultCX + dotGap * idx}
                            cy={angle.to((value) => getCY(value, idx))}
                            r={dotRadius} />
                    )
                }
            </svg>
        </MessageBubbleWrapper>
    );
}