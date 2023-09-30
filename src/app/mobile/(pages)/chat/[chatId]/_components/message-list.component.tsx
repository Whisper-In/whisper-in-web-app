import classNames from "classnames";
import MessageBubble from "./message-bubble.component";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/store/states/chats.states";
import { MessageBubbleAudio } from "./message-bubble-audio.component";
import { MessageBubbleTyping } from "./message-bubble-typing.component";

export default function MessageList({ className, messageList, chatId, userId, isTyping }
    : { className?: string, messageList: ChatMessage[], chatId: string, userId?: string, isTyping?: boolean }) {
    const messageListRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        messageListRef.current?.scrollTo({
            top: messageListRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, [messageList])

    return (
        <div className={classNames(
            "relative",
            className
        )}>
            <div ref={messageListRef} className="flex flex-col overflow-y-auto overflow-x-hidden absolute top-0 bottom-0 left-0 right-0" >
                <div className={classNames(
                    "flex flex-col-reverse justify-start items-stretch p-3 gap-2",
                    className
                )}>
                    {
                        isTyping &&
                        <MessageBubbleTyping />
                    }
                    {
                        messageList.map((message, idx) => {
                            if (!message.isAudio || !message.audioId) {
                                return <MessageBubble key={idx}
                                    message={message} isUser={message.senderId == userId} />
                            } else {
                                return <MessageBubbleAudio key={idx} chatId={chatId}
                                    message={message} isUser={message.senderId == userId} />
                            }
                        })
                    }
                </ div>
            </div>
        </div>
    );
}