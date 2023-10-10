import { ChatMessage } from "@/store/states/chats.states";

export enum ChatFeature {
    AUDIO
}

export interface IUserChatProfileDto {
    _id: string;
    name: string;
    avatar?: string;
    isBlocked?: boolean;
}

export interface IUserChatRawDto {
    chatId: string;
    features: string[];
    profiles: IUserChatProfileDto[];
    isAudioOn: boolean;
    lastMessage: IUserChatMessageDto;    
}

export interface IUserChatDto {
    chatId: string;
    features: ChatFeature[];
    lastMessage: ChatMessage;
    profiles: IUserChatProfileDto[];
}
export interface IUserChatMessageDto {
    _id: string;
    chatId: string;
    message: string;
    sender: string;
    isAudio?: boolean;
    createdAt?: string;
    updatedAt?: string;
}


export interface IUserChatMessagesResultDto {
    chatId: string;
    messages: IUserChatMessageDto[];
    totalMessages: number;
}