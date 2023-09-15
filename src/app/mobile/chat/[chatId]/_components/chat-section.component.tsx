"use client"

import classNames from "classnames";
import MessageList from "./message-list.component";
import ChatInputBar from "./input-bar.component";
import { useEffect, useRef, useState } from "react";
import { IUserChatRawDto, IUserChatMessageDto, IUserChatDto } from "@/server-dtos/chats/chats.server-dtos";
import { useAppDispath, useAppSelector } from "@/store/hooks";
import * as chatGPTClientService from "@/app/_client-services/chat/chat-gpt.client-service";
import Header from "@/app/mobile/_components/header.component";
import { Avatar } from "@mui/material";
import { addNewChatMessage, toggleAudioReplies, updateChatFeatures } from "@/store/slices/chats.slice";
import { fetchChatCompletion } from "@/store/thunks/chats.thunks";
import BackButton from "@/app/mobile/_components/back-button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { profile } from "console";
import { ChatFeature } from "@/store/states/chats.states";
import { faAdversal, faAmazonPay } from "@fortawesome/free-brands-svg-icons";

export default function ChatSection({ className, chat }
    : { className?: string, chat: IUserChatDto }) {
    const me = useAppSelector((state) => state.user.me);
    const aiProfile = chat.profiles.findLast((profile) => profile._id != me?._id)!;
    const _chat = useAppSelector((state) => state.chats.chats.find((c) => c.chatId == chat.chatId));
    const messageList = _chat?.messages ?? [];
    const [isReplying, setIsReplying] = useState(false);
    const dispatch = useAppDispath();

    const hasAudioReply = chat.features.includes(ChatFeature.AUDIO);

    useEffect(() => {
        if (chat) {
            dispatch(updateChatFeatures({
                chatId: chat.chatId,
                features: chat.features
            }));
        }
    }, [chat]);


    const getChatCompletion = async (message: string) => {
        setIsReplying(true);
        try {
            await dispatch(fetchChatCompletion({
                chatId: chat.chatId,
                contactId: aiProfile._id,
                message
            }));
        } catch (error) {

        } finally {
            setIsReplying(false);
        }
    }

    const onSend = (message: string | undefined) => {
        if (!message?.length || !me) {
            return
        }

        const createdAt = new Date().toString();

        dispatch(addNewChatMessage({
            chatId: chat.chatId,
            senderId: me._id,
            message,
            createdAt,
            updatedAt: createdAt
        }));

        if (aiProfile.isBlocked) {
            return;
        }

        getChatCompletion(message);
    }

    const onToggleAudioReplies = () => {
        dispatch(toggleAudioReplies({
            chatId: chat.chatId,
            isAudioRepliesOff: !_chat?.isAudioRepliesOff
        }));
    }

    return (
        <>
            <Header>
                <div className="flex gap-5 items-center">
                    <div className="flex grow items-center gap-5">
                        <Avatar src={aiProfile.avatar} sx={{ width: 50, height: 50 }} />
                        <label className="font-bold text-lg">{aiProfile.name}</label>
                    </div>

                    {
                        hasAudioReply &&
                        <button onClick={onToggleAudioReplies}>
                            <FontAwesomeIcon icon={_chat?.isAudioRepliesOff ? faVolumeMute : faVolumeHigh} fontSize={20} />
                        </button>
                    }
                </div>
            </Header>

            <div className={classNames(
                "h-full w-full flex flex-col",
                className
            )}>
                <MessageList className="grow" messageList={messageList} userId={me?._id} isTyping={isReplying} />

                <ChatInputBar onSend={onSend} />
            </div>
        </>
    )
}