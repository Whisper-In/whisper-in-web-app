import { IProfileDto, IProfileSearchDto } from "@/server-dtos/profile/profile.server-dtos";
import axiosInstance from "../axios";
import { ChatFeature, IUserChatDto } from "@/server-dtos/chats/chats.server-dtos";

const route = "chats";

export const getUserChats = async (userId: string) => {
  try {
    const result = await axiosInstance.get<IUserChatDto[]>(
      `${route}/user-chats/${userId}`
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const createNewChat = async (userId: string, aiProfileId: string) => {
  try {
    const result = await axiosInstance.post(`${route}/user-chats/new-chat`, { userId, aiProfileId });

    return result.data.chatId;
  } catch (error) {
    throw error;
  }
}

export const getChat = async (chatId: string) => {
  try {
    const result = await axiosInstance.get<IUserChatDto>(`${route}/${chatId}`);    
    
    return {
      chatId: result.data.chatId,
      profiles: result.data.profiles,
      features: result.data.features
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