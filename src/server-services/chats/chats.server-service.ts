import axiosInstance from "../axios";
import { ChatFeature, IUserChatRawDto, IUserChatDto } from "@/dtos/chats/chats.dtos";

const route = "chats";

export const getUserChats = async () => {   
  try {
    const result = await axiosInstance.get<IUserChatRawDto[]>(
      `${route}/user-chats/chats`
    );

    return result.data;
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