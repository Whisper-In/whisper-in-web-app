import { IUserChatMessageDto } from "@/dtos/chats/chats.dtos";
import axios from "axios";
import OpenAI from "openai";

const route = "/api/chat/chat-gpt";

export const MAX_PREV_MESSAGES_LIMIT = 100;

export async function getChatCompletion(aiProfileId: string,
    message: string,
    prevMessages: OpenAI.Chat.ChatCompletionMessageParam[]) {
    try {
        const results = await axios.post(`${route}/completion`, {
            aiProfileId,
            message,
            prevMessages
        });
        return results.data as IUserChatMessageDto;
    } catch (error) {
        throw error;
    }
}