import classNames from "classnames";
import MessageBubble from "./message-bubbles/message-bubble.component";
import { Fragment, UIEventHandler, useEffect, useRef, useState } from "react";
import { MessageBubbleAudio } from "./message-bubbles/message-bubble-audio.component";
import { MessageBubbleTyping } from "./message-bubbles/message-bubble-typing.component";
import { isScrollEnded } from "@/utils/component.util";
import { Typography } from "@mui/material";
import { convertToMessageDateGroup, isDateEqual } from "@/utils/datetime.util";
import { IUserChatMessagesResultDto } from "@/dtos/chats/chats.dtos";

let prevScrollHeight = 0
export default function MessageList({
    className,
    chatId,
    isTyping,
    messagesList,
    onScrollEnd,
    isValidating,
    isLoading
}
    : {
        className?: string,
        chatId: string,
        isTyping?: boolean,
        messagesList?: IUserChatMessagesResultDto[],
        onScrollEnd?: () => void,
        isValidating?: boolean,
        isLoading?: boolean
    }) {

    const totalMessages = messagesList?.at(0)?.totalMessages || 0;
    const messages = messagesList?.flatMap((d) => d.messages) || [];
    const messageListRef = useRef<HTMLDivElement>(null);
    const [scrollEnded, setScrollEnded] = useState(false);

    const onScroll: UIEventHandler<HTMLDivElement> = (e) => {
        if (isScrollEnded(e, true)) {
            if (onScrollEnd) {
                onScrollEnd();
            }

            setScrollEnded(true);
        }
    }

    useEffect(() => {
        if (!isLoading) {
            messageListRef.current?.scrollTo({
                top: messageListRef.current.scrollHeight,
                behavior: "instant"
            });
        }
    }, [isLoading]);

    useEffect(() => {
        if (isValidating) {
            prevScrollHeight = messageListRef.current?.scrollHeight || 0;
        } else {
            if (scrollEnded) {
                messageListRef.current?.scrollTo({
                    top: messageListRef.current?.scrollHeight - prevScrollHeight,
                    behavior: "instant"
                });

                setScrollEnded(false);
            }
        }
    }, [isValidating]);

    useEffect(() => {
        if (isTyping) {
            if (messageListRef.current?.scrollTop == messageListRef.current?.scrollHeight) {
                messageListRef.current?.scrollTo({
                    top: messageListRef.current.scrollHeight,
                    behavior: "smooth"
                });
            }
        }
    }, [isTyping])

    return (
        <div className={classNames(
            "relative",
            className
        )}>
            <div ref={messageListRef}
                role="list"
                onScroll={onScroll}
                className="flex flex-col overflow-y-auto overflow-x-hidden absolute top-0 bottom-0 left-0 right-0" >
                <div className={classNames(
                    "flex flex-col-reverse justify-start items-stretch p-3 gap-2",
                    className
                )}>
                    {
                        isTyping &&
                        <MessageBubbleTyping />
                    }
                    {
                        messages?.map((message, idx) => {
                            let messageBubble = <MessageBubble
                                message={message} isUser={message.isSender} />

                            if (message.isAudio && message.isSender) {
                                messageBubble = <MessageBubbleAudio chatId={chatId}
                                    message={message} isUser={message.isSender} />
                            }

                            return (
                                <Fragment key={idx}>
                                    {messageBubble}
                                    {
                                        (
                                            idx == (totalMessages ?? Number.MIN_SAFE_INTEGER) - 1 ||
                                            !isDateEqual(message.createdAt!, messages[idx + 1]?.createdAt!)
                                        )
                                        &&
                                        <div>
                                            <Typography
                                                sx={{
                                                    padding: 1,
                                                    opacity: 0.5
                                                }}
                                                textAlign="center">
                                                {convertToMessageDateGroup(message.createdAt)}
                                            </Typography>
                                        </div>
                                    }
                                </Fragment>
                            )
                        })
                    }
                </ div>
            </div>
        </div>
    );
}