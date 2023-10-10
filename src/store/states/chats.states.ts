export type ChatMessage = {
    sender: string;
    message: string;
    isAudio?: boolean;
    messageId?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type ChatProfile = {
    id: string;
    name: string;
    avatar?: string;
    isBlocked?: boolean;
};

export enum ChatFeature {
    AUDIO
}

export type Chat = {
    chatId: string;
    isAudioOn?: boolean;
    features?: number[];
    profiles: ChatProfile[];
    lastMessage?: ChatMessage;
    messages: ChatMessage[];
    totalMessages?: number;
};

export type ChatsState = {
    chats: Chat[];
};
