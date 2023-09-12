import { IUserChatMessageDto } from "@/server-dtos/chats/chats.server-dtos";
import classNames from "classnames";
import MessageBubble, { MessageBubbleTyping } from "./message-bubble.component";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/store/states/chats.states";

export default function MessageList({ className, messageList, userId, isTyping }
    : { className?: string, messageList: ChatMessage[], userId?: string, isTyping?: boolean }) {
    const messageListRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight });
            setIsLoaded(true);
        }
    }, [messageList])

    return (
        <div className={classNames(
            "relative",
            className
        )}>
            <div ref={messageListRef} className="flex flex-col overflow-y-auto absolute top-0 bottom-0 left-0 right-0" >
                <div className={classNames(
                    "flex flex-col-reverse justify-start items-stretch p-3 gap-2",
                    className
                )}>
                    {
                        isTyping &&
                        <MessageBubbleTyping />
                    }
                    {
                        messageList.map((message, idx) =>
                            <MessageBubble key={idx} className="max-w-[80%]"
                                message={message} isUser={message.senderId == userId} />)
                    }
                </ div>
            </div>
        </div>
    );
}