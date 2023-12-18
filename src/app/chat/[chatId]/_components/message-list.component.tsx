import classNames from "classnames";
import MessageBubble from "./message-bubbles/message-bubble.component";
import { Fragment, UIEventHandler, useEffect, useRef, useState } from "react";
import { MessageBubbleAudio } from "./message-bubbles/message-bubble-audio.component";
import { MessageBubbleTyping } from "./message-bubbles/message-bubble-typing.component";
import { isScrollEnded } from "@/utils/component.util";
import { CircularProgress, Fab, IconButton, Typography } from "@mui/material";
import { convertToMessageDateGroup, isDateEqual } from "@/utils/datetime.util";
import { IUserChatMessagesResultDto } from "@/dtos/chats/chats.dtos";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";

const SCROLL_TO_BOTTOM_BUTTON_THRESHOLD = 65;

export default function MessageList({
    className,
    chatId,
    isTyping,
    messageList,
    onScrollEnd,
    isValidating,
    isLoading
}
    : {
        className?: string,
        chatId: string,
        isTyping?: boolean,
        messageList?: IUserChatMessagesResultDto,
        onScrollEnd?: () => void,
        isValidating?: boolean,
        isLoading?: boolean
    }) {
    const [scrollOffset, setScrollOffset] = useState<number>(0)

    const messages = messageList?.messages || []
    const totalMessages = messageList?.totalMessages || 0;
    const messageListRef = useRef<HTMLDivElement>(null);

    const updateScrollOffset = () => {
        const tempScrollOffset = Math.floor((messageListRef.current?.scrollHeight || 0) - (messageListRef.current?.scrollTop || 0));
        setScrollOffset(tempScrollOffset);
    }

    const onScroll: UIEventHandler<HTMLDivElement> = (e) => {
        if (isScrollEnded(e, true)) {
            if (onScrollEnd) {
                onScrollEnd();
            }
        }

        updateScrollOffset();
    }

    const scrollToBottom = () => {
        messageListRef.current?.scrollTo({
            top: messageListRef.current.scrollHeight,
            behavior: "smooth"
        });

        updateScrollOffset();
    }

    useEffect(() => {
        if (messages.length) {
            messageListRef.current?.scrollTo({
                top: messageListRef.current.scrollHeight - scrollOffset,
                behavior: "instant"
            });
        }
    }, [messages]);

    useEffect(() => {
        if (isTyping) {
            messageListRef.current?.scrollTo({
                top: messageListRef.current.scrollHeight - scrollOffset,
                behavior: "smooth"
            });
        }
    }, [isTyping]);

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
                    {
                        isValidating &&
                        <CircularProgress
                            sx={{
                                alignSelf: "center"
                            }}
                            size={30}
                            aria-busy={true} />
                    }
                </ div>
            </div>

            {
                scrollOffset - (messageListRef.current?.clientHeight || 0) > SCROLL_TO_BOTTOM_BUTTON_THRESHOLD &&
                <Fab
                    aria-label="scroll-to-bottom-button"
                    sx={{
                        opacity: 0.3,
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bottom: 5,
                    }}
                    size="small"
                    onClick={scrollToBottom}
                >
                    <KeyboardDoubleArrowDown />
                </Fab>
            }
        </div>
    );
}