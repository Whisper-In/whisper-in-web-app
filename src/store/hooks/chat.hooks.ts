import { IUserChatDto, IUserChatMessageDto, IUserChatMessagesResultDto } from "@/dtos/chats/chats.dtos";
import useSWRInfinite from "swr/infinite";
import { fetcher, getKey, getKeyForObject } from "./fetcher";
import useSWR from "swr";

const route = "/api/chats";

export const useGetUserChats = () => {
    return useSWR<IUserChatDto[]>(`${route}/user-chats/chats`, fetcher);
}

export const useGetChatDetail = (chatId: string) => {
    return useSWR<IUserChatDto>(`${route}/${chatId}`, fetcher, {
        revalidateOnFocus: false
    });
}

export const useGetChatMessages = (chatId: string, messageCount: number) => {
    const params = new URLSearchParams({
        messageCount: messageCount.toString()
    });

    return useSWRInfinite<IUserChatMessagesResultDto>(
        (pageIndex, previousData) => getKeyForObject(`${route}/chat-messages/${chatId}`, pageIndex, previousData, "messages", params),
        fetcher,
        {
            revalidateAll: false
        }
    )
}