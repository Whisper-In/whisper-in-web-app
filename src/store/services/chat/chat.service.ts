import { IUserChatDto, IUserChatMessageDto, IUserChatMessagesResultDto } from "@/dtos/chats/chats.dtos";
import axios from "axios";

const route = "/api/chats";

export async function getUserChats() {
    try {
        const results = await axios.get(`${route}/user-chats/chats`);

        return results.data as IUserChatDto[];
    } catch (error) {
        throw error;
    }
}

export async function createNewChat(profileId: string) {
    try {
        const result = await axios.post(`${route}/user-chats/new-chat`, { profileId });

        return result.data
    } catch (error) {
        throw error;
    }
}

export async function getChatCompletionWithVectorDB(chatId: string, recipientUserId: string, message: string) {
    try {
        const result = await axios.post(`${route}/chat-completion-vector-db`, {
            chatId,
            recipientUserId,
            message
        });

        return result.data as { messageId: string, message: string };
    } catch (error) {
        throw error;
    }
}

export async function getChatMessages(chatId: string, pageIndex: number, messageCount: number) {
    try {
        const result = await axios.get<IUserChatMessagesResultDto>(`${route}/chat-messages/${chatId}?${new URLSearchParams({
            pageIndex: pageIndex.toString(),
            messageCount: messageCount.toString()
        })}`)

        return result.data
    } catch (error) {
        throw error;
    }
}

export async function insertNewChatMessage(chatId: string, message: string, senderId?: string) {
    try {
        const result = await axios.post<IUserChatMessageDto>(`${route}/chat-messages/message`, {
            chatId,
            senderId,
            message
        });

        return result.data
    } catch (error) {
        throw error;
    }
}

export async function getChatCompletion(chatId: string, profileId: string, message: string) {
    try {
        const result = await axios.post<IUserChatMessageDto>(`${route}/chat-completion`, {
            chatId,
            profileId,
            message
        });

        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function setChatAudioReply(chatId: string, isAudioOn: boolean) {
    try {
        const result = await axios.put<IUserChatDto>(`${route}/audio-reply/${chatId}`, {
            isAudioOn
        });

        return result.data;
    } catch (error) {
        throw error;
    }
}