import { IUserChatRawDto } from "@/dtos/chats/chats.dtos";
import axios from "axios";

const route = "/api/chat";

export async function getUserChats(userId: string) {
    try {
        const results = await axios.get(`${route}/user-chats/${userId}`);

        return results.data as IUserChatRawDto[];
    } catch (error) {
        throw error;
    }
}

export async function createNewChat(userId: string, aiProfileId: string) {
    try {
        const chatId: string = await axios.post(`${route}/user-chats/create-new-chat`, {
            userId,
            aiProfileId
        });

        return chatId
    } catch (error) {
        throw error;
    }
}