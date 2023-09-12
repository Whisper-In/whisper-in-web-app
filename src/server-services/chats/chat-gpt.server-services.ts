import { IUserChatMessageDto } from "@/server-dtos/chats/chats.server-dtos";
import OpenAI from "openai";
import axiosInstance from "../axios";

  const route = "chat-gpt";
  
  export const MAX_PREV_MESSAGES_LIMIT = 100;
  
  export const getChatCompletion = async (
    aiProfileId: string,
    message: string,
    prevMessages: OpenAI.Chat.ChatCompletionMessageParam[]
  ): Promise<IUserChatMessageDto> => {
    try {
      const result = await axiosInstance.post(`${route}/chat-completion`, {
        message,
        aiProfileId,
        prevMessages,
      });
  
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  