import classNames from "classnames";
import MessageBubble from "./message-bubbles/message-bubble.component";
import { Fragment, UIEventHandler, useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/store/states/chats.states";
import { MessageBubbleAudio } from "./message-bubbles/message-bubble-audio.component";
import { MessageBubbleTyping } from "./message-bubbles/message-bubble-typing.component";
import { isScrollEnded } from "@/utils/component.util";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchChatMessages } from "@/store/thunks/chats.thunks";
import { Typography } from "@mui/material";
import { convertToMessageDateGroup, isDateEqual } from "@/utils/datetime.util";

export default function MessageList({
    className,
    chatId,
    userId,
    isTyping,
}
    : {
        className?: string,
        chatId: string,
        userId?: string,
        isTyping?: boolean
    }) {
    const chat = useAppSelector((state) => state.chats.chats.find((c) => c.chatId == chatId))!;
    const messageList = chat?.messages ?? [];
    const messageListRef = useRef<HTMLDivElement>(null);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [prevScrollHeight, setPrevScrollHeight] = useState(0);
    const messagePerLoad = 50;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchChatMessages({
            chatId,
            pageIndex: 0,
            messageCount: messagePerLoad,
            clearMessages: true
        }));
    }, []);

    useEffect(() => {
        if (!isLoadingMessages) {
            messageListRef.current?.scrollTo({
                top: messageListRef.current.scrollHeight,
                behavior: "smooth"
            });
        } else {
            messageListRef.current?.scrollTo({
                top: messageListRef.current.scrollHeight - prevScrollHeight,
                behavior: "instant"
            });
        }
    }, [messageList]);


    const loadChatMessages = () => {
        if (chat!.messages.length < (chat!.totalMessages ?? 0)) {
            const pageIndex = chat!.messages.length / messagePerLoad;

            setIsLoadingMessages(true);
            setPrevScrollHeight(messageListRef.current?.scrollHeight ?? 0);

            dispatch(fetchChatMessages({
                chatId: chatId,
                pageIndex,
                messageCount: messagePerLoad
            })).finally(() => {
                setIsLoadingMessages(false);
            })
        }
    }

    const onScrollEnd = () => {
        loadChatMessages();
    }

    const onScroll: UIEventHandler<HTMLDivElement> = (e) => {
        if (isScrollEnded(e, true)) {
            onScrollEnd();
        }
    }

    return (
        <div className={classNames(
            "relative",
            className
        )}>
            <div ref={messageListRef}
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
                        messageList?.map((message, idx) => {
                            let messageBubble = <MessageBubbleAudio chatId={chatId}
                                message={message} isUser={message.sender == userId} />

                            if (!message.isAudio || !message.messageId) {
                                messageBubble = <MessageBubble
                                    message={message} isUser={message.sender == userId} />
                            }

                            return (
                                <Fragment key={idx}>
                                    {messageBubble}
                                    {
                                        (
                                            idx == (chat.totalMessages ?? Number.MIN_SAFE_INTEGER) - 1 ||
                                            !isDateEqual(message.createdAt!, messageList[idx + 1]?.createdAt!)
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