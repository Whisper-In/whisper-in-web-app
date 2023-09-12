import { IUserChatDto, IUserChatMessageDto } from "@/server-dtos/chats/chats.server-dtos";
import axios from "axios";

const route = "/api/chat";

export async function getUserChats(userId: string) {
    try {
        const results = await axios.get(`${route}/user-chats/${userId}`);

        return results.data as IUserChatDto[];
    } catch (error) {
        throw error;
    }
}