"use client"

import classNames from "classnames";
import { ChatMessage } from "@/store/states/chats.states";
import { convertToMessageTime } from "@/utils/datetime.util";
import { MessageBubbleWrapper } from "./message-bubble-wrapper.component";


export default function MessageBubble({ className, message, isUser }
    : { className?: string, message: ChatMessage, isUser?: boolean }) {

    const time = convertToMessageTime(message.updatedAt!);

    return (
        <MessageBubbleWrapper className={classNames(
            "max-w-[80%]",
            className
        )} isPrimary={isUser}>
            <div className="p-1 items-end">
                <div className="p-1 break-words">
                    {message.message}
                </div>

                <div className="text-xs w-full text-end">
                    {time}
                </div>
            </div>
        </MessageBubbleWrapper>
    );
}

