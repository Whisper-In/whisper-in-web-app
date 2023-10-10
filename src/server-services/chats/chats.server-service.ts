import axiosInstance, { fetchInstance } from "../axios";
import { ChatFeature, IUserChatRawDto, IUserChatDto, IUserChatMessagesResultDto, IUserChatMessageDto } from "@/dtos/chats/chats.dtos";

const route = "chats";

export const getUserChats = async () => {
  try {
    const result = await fetchInstance.fetch<IUserChatRawDto[]>(
      `${route}/user-chats/chats`,
      {
        method: "GET"
      }
    );

    return result;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const createNewChat = async (profileId: string) => {
  try {
    const result = await axiosInstance.post(`${route}/user-chats/new-chat`, { profileId });

    return result.data.chatId;
  } catch (error) {
    throw error;
  }
}

export const getChat = async (chatId: string): Promise<IUserChatDto> => {
  try {
    const result = await axiosInstance.get<IUserChatRawDto>(`${route}/${chatId}`);

    return {
      chatId: result.data.chatId,
      profiles: result.data.profiles,
      lastMessage: result.data.lastMessage,
      features: result.data.features.map((feature) => ChatFeature[feature as keyof typeof ChatFeature])
    };
  } catch (error) {
    throw error;
  }
}

export const updateChatProfileBlockStatus = async (userId: string, aiProfileId: string, isBlocked: boolean) => {
  try {
    const result = await axiosInstance.put(`${route}/block-profile`, { userId, aiProfileId, isBlocked });

    return result.data;
  } catch (error) {
    throw error;
  }
}

export const getChatCompletionWithVectorDB = async (chatId: string, recipientUserId: string, message: string) => {
  try {
    const result = await fetchInstance.fetch(`${route}/chat-completion-vector-db`, {
      method: "POST",
      body: JSON.stringify({
        chatId,
        recipientUserId,
        message
      })
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export const getChatMessages = async (chatId: string, pageIndex: string, messageCount: string) => {
  try {
    const result = await fetchInstance.fetch(`${route}/chat-messages/${chatId}?${new URLSearchParams({
      pageIndex,
      messageCount
    })}`, {
      method: "GET"
    });

    return result as IUserChatMessagesResultDto;
  } catch (error) {
    throw error;
  }
}

export const insertNewChatMessage = async (chatId: string, senderId: string, message: string) => {
  try {
    const result = await fetchInstance.fetch(`${route}/chat-messages/message`, {
      method: "POST",
      body: JSON.stringify({
        chatId,
        senderId,
        message
      })
    });

    return result as IUserChatMessageDto;
  } catch (error) {
    throw error;
  }
}

export const getChatCompletion = async (chatId: string, profileId: string, message: string) => {
  try {
    const result = await fetchInstance.fetch(`${route}/chat-completion`, {
      method: "POST",
      body: JSON.stringify({
        chatId,
        profileId,
        message
      })
    });

    return result as IUserChatMessageDto;
  } catch (error) {
    throw error;
  }
}

export const setChatAudioReply = async (chatId: string, isAudioOn: boolean) => {
  try {
    const result = await fetchInstance.fetch(`${route}/audio-reply/${chatId}`, {
      method: "PUT",
      body: JSON.stringify({
        isAudioOn
      })
    })

    return result as IUserChatDto;
  } catch (error) {
    throw error;
  }
}