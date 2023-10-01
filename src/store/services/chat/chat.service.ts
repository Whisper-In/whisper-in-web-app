import { IUserChatRawDto } from "@/dtos/chats/chats.dtos";
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