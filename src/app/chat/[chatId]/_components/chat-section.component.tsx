"use client"

import MessageList from "./message-list.component";
import ChatInputBar from "./input-bar.component";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import Header from "@/app/_components/header.component";
import { Avatar } from "@mui/material";
import { fetchChatCompletion } from "@/store/thunks/chats.thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import BackButton from "@/app/_components/back-button.component";
import Link from "next/link";
import { useGetChatDetail, useGetChatMessages } from "@/store/hooks/chat.hooks";
import { setChatAudioReply } from "@/store/services/chat/chat.service";
import * as chatService from "@/store/services/chat/chat.service";
import { ToastDuration, useToast } from "@/app/_components/toast.component";
import { IUserChatMessagesResultDto } from "@/dtos/chats/chats.dtos";
import Loading from "../loading";

const REPLY_MINDELAY = 1000;
const REPLY_MAXDELAY = 3000;
const MESSAGE_COUNT = 15;

export default function ChatSection({ chatId }: { chatId: string }) {
    const { data: chat,
        isLoading: isChatLoading,
        mutate: updateChat } = useGetChatDetail(chatId);

    const { showToast } = useToast();

    const { data: rawMessages,
        isLoading: isMessagesLoading,
        isValidating: isMessageValidating,
        mutate: updateChatMessages,
        size,
        setSize
    } = useGetChatMessages(chatId, MESSAGE_COUNT);

    const [messageResult, setMessageResult] = useState<IUserChatMessagesResultDto>();

    const hasAudioFeature = chat?.features?.includes("AUDIO");
    const profile = chat?.profile

    const [isReplying, setIsReplying] = useState(false);

    const getChatCompletion = async (message: string) => {
        if (!chat || !profile) {
            return;
        }

        const start = Date.now();

        setIsReplying(true);
        try {
            await chatService.getChatCompletion(chat.chatId, profile._id, message);
        } catch (error) {

        } finally {
            const delay = Math.random() * REPLY_MAXDELAY + REPLY_MINDELAY;
            const now = Date.now();

            setTimeout(() => {
                updateChatMessages().then(() => {
                    setIsReplying(false);
                });
            }, Math.max(0, delay - now - start));
        }
    }

    const onSend = (message: string | undefined) => {
        if (!chat || !message?.length) {
            return
        }

        const today = new Date();

        setMessageResult({
            chatId: chat._id,
            totalMessages: messageResult?.totalMessages || 0,
            messages: [
                {
                    chatId: chat._id,
                    messageId: "",
                    sender: "",
                    isSender: true,
                    message,
                    createdAt: today.toISOString(),
                    updatedAt: today.toISOString()
                },
                ...messageResult?.messages || [],
            ]
        })

        chatService.insertNewChatMessage(chatId, message).then(() => {
            updateChatMessages();

            if (profile?.isSubscriptionOn && !profile?.isBlocked) {
                getChatCompletion(message);
            }
        }).catch(() => {

        });
    }

    const onToggleAudioReplies = () => {
        setChatAudioReply(chatId, !chat?.isAudioOn)
            .then(() => {
                updateChat();
            });
    }

    const onMessageListScrollEnd = () => {
        if (!isMessageValidating) {
            setSize(size + 1)
        }
    }

    useEffect(() => {
        if (!isChatLoading) {
            if (!chat?.profile.isSubscriptionOn) {
                showToast({
                    message: `${chat?.profile.name} does not have auto-reply turned on.`,
                    severity: "info",
                    duration: ToastDuration.LONG
                })
            }
        }
    }, [isChatLoading])

    useEffect(() => {
        if (rawMessages?.length) {
            const result: IUserChatMessagesResultDto = {
                chatId: rawMessages.at(0)!.chatId,
                totalMessages: rawMessages.at(0)!.totalMessages,
                messages: rawMessages.flatMap((m) => m.messages)
            }

            setMessageResult(result);
        }
    }, [rawMessages])

    return (
        <>
            <Header>
                <div className="flex gap-5 items-center w-full">
                    <div className="flex grow items-center gap-5">
                        <BackButton relative />

                        <Link href={`/profile/${profile?._id}`}>
                            <Avatar src={profile?.avatar} sx={{ width: 40, height: 40 }} />
                        </Link>

                        <label className="font-bold text-lg">{profile?.name}</label>
                    </div>

                    {
                        hasAudioFeature &&
                        <button onClick={onToggleAudioReplies}>
                            <FontAwesomeIcon icon={!chat?.isAudioOn ? faVolumeMute : faVolumeHigh} fontSize={20} />
                        </button>
                    }
                </div>
            </Header>

            <MessageList className="grow"
                chatId={chatId}
                isTyping={isReplying}
                messageList={messageResult}
                onScrollEnd={onMessageListScrollEnd}
                isValidating={isMessageValidating}
                isLoading={isMessagesLoading} />

            <ChatInputBar onSend={onSend} />
        </>
    )
}