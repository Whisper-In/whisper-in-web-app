import {
    AddNewChatMessageAction,
    ChatMessageActionPayload,
    LoadChatMessagesPayload,
    LoadChatsAction,
    LoadChatsActionPayload,
    UpdateChatMessageAction,
} from "../types/chats.types";
import { Chat, ChatFeature, ChatProfile, ChatsState } from "../states/chats.states";

export const loadChatsReducer = (
    state: ChatsState,
    action: LoadChatsAction
) => {
    const payload = action.payload as LoadChatsActionPayload[];

    state.chats = payload.map<Chat>((item) => {
        const stateChat = state.chats?.find((chat) => chat.chatId == item.chatId);
        const stateChatMessages = stateChat?.messages ?? [];

        return {
            chatId: item.chatId,
            isAudioRepliesOff: !item.isAudioOn,
            profiles: item.profiles.map<ChatProfile>((profile) => ({
                id: profile.id,
                name: profile.name,
                avatar: profile.avatar,
                isBlocked: profile.isBlocked
            })),
            lastMessage: item.lastMessage,
            messages: [...stateChatMessages],
        };
    });

    return state;
};

export const loadChatMessages = (
    state: ChatsState,
    action: { payload: LoadChatMessagesPayload }
) => {
    const payload = action.payload;

    const chat = state.chats?.find((chat) => chat.chatId == payload.chatId);

    if (chat) {
        if(payload.clearMessages) {
            chat.messages = [];
        }
        
        chat.messages = chat.messages.concat(payload.messages);
        chat.totalMessages = payload.totalMessages;
    }

    return state;
};

export const updateChatFeatures = (state: ChatsState,
    action: { payload: { chatId: string, features: ChatFeature[] } }) => {
    const { payload } = action;

    const chat = state.chats.find((chat) => chat.chatId == payload.chatId);

    if (chat) {
        chat.features = payload.features;
    }

    return state;
}

export const addNewChatMessage = (
    state: ChatsState,
    action: AddNewChatMessageAction
) => {
    const payload = action.payload as ChatMessageActionPayload;

    if (!payload.message?.length) return state;

    let chat = state.chats.find((chat) => chat.chatId == payload.chatId);

    if (chat) {
        chat.messages.unshift(payload);
    }

    return state;
};

export const toggleChatAudioReplies = (
    state: ChatsState,
    action: { payload: { chatId: string, isAudioRepliesOff: boolean } }
) => {
    const chat = state.chats.find((chat) => chat.chatId == action.payload.chatId);

    if (chat) {
        chat.isAudioRepliesOff = action.payload.isAudioRepliesOff;
    }

    return state;
}