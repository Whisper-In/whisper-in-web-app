import { IUserChatMessageDto } from "@/server-dtos/chats/chats.server-dtos";
import classNames from "classnames";
import { PropsWithChildren, useEffect, useState } from "react";
import { animated, useSpring, useSpringValue } from "@react-spring/web";
import { duration } from "@mui/material";
import { ChatMessage } from "@/store/states/chats.states";

function MessageBubbleWrapper({ className, isPrimary, children }: { className?: string, isPrimary?: boolean } & PropsWithChildren) {
    return (
        <div className={classNames(
            "w-fit p-2",
            className,
            {
                "bg-primary text-onPrimary rounded-tr-2xl rounded-l-2xl self-end": isPrimary,
                "bg-secondary text-onSecondary rounded-bl-2xl rounded-r-2xl": !isPrimary
            }
        )}>
            {children}
        </div>
    );
}

export default function MessageBubble({ className, message, isUser }
    : { className?: string, message: ChatMessage, isUser?: boolean }) {

    const updatedAt = typeof message.updatedAt == "string" ? new Date(message.updatedAt) : message.updatedAt;

    const time = updatedAt?.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <MessageBubbleWrapper className={classNames(
            "max-w-[80%]",
            className
        )} isPrimary={isUser}>
            <div className="flex gap-2 p-1 items-end">
                <div className="p-1 whitespace-pre-wrap">
                    {message.message}
                </div>

                <div className="text-xs">
                    {time}
                </div>
            </div>
        </MessageBubbleWrapper>
    );
}

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
        const offsetAngle = Math.PI/2;
        const offset = idx * offsetAngle;
        return (Math.sin(value + offset) + 1) / 2 * defaultCY + dotRadius + padding;
    }

    return (
        <MessageBubbleWrapper isPrimary={isUser}>
            <svg width={width} height={height} fill="grey">
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