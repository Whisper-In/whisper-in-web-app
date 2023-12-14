import { ChatMessage } from "@/store/states/chats.states";

export enum ChatFeature {
    AUDIO
}

export interface IUserChatProfileDto {
    _id: string;
    name: string;
    avatar?: string;
    isBlocked?: boolean;
    isSubscriptionOn: boolean;
}

export interface IUserChatDto {
    _id: string;
    chatId: string;
    features?: ("AUDIO" | "VIDEO")[];
    profile: IUserChatProfileDto;
    isAudioOn: boolean;
    lastMessage: IUserChatMessageDto;
}

export interface IUserChatMessageDto {
    messageId: string;
    chatId: string;
    message: string;
    sender: string;
    isSender?: boolean;
    isAudio?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserChatMessagesResultDto {
    chatId: string;
    messages: IUserChatMessageDto[];
    totalMessages: number;
}