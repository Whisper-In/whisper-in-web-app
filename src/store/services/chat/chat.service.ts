import { IUserChatMessageDto, IUserChatMessagesResultDto, IUserChatRawDto } from "@/dtos/chats/chats.dtos";
import axios from "axios";

const route = "/api/chat";

export async function getUserChats() {
    try {
        const results = await axios.get(`${route}/user-chats`);

        return results.data as IUserChatRawDto[];
    } catch (error) {
        throw error;
    }
}

export async function createNewChat(profileId: string) {
    try {
        const result = await axios.post(`${route}/user-chats/create-new-chat`, { profileId });

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
        const result = await fetch(`${route}/chat-messages/${chatId}?${new URLSearchParams({
            pageIndex: pageIndex.toString(),
            messageCount: messageCount.toString()
        })}`, {
            method: "GET"
        }).then((result) => result.json());

        return result as IUserChatMessagesResultDto
    } catch (error) {
        throw error;
    }
}

export async function insertNewChatMessage(chatId: string, senderId: string, message: string) {
    try {
        const result = await fetch(`${route}/chat-messages/message`, {
            method: "POST",
            body: JSON.stringify({
                chatId,
                senderId,
                message
            })
        }).then((result) => result.json());

        return result as IUserChatMessageDto
    } catch (error) {
        throw error;
    }
}

export async function getChatCompletion(chatId: string, profileId: string, message: string) {
    try {
        const result = await fetch(`${route}/chat-completion`, {
            method: "POST",
            body: JSON.stringify({
                chatId,
                profileId,
                message
            })
        }).then((result) => result.json());

        return result as IUserChatMessageDto
    } catch (error) {
        throw error;
    }
}