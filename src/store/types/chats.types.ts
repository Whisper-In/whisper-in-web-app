export type LoadChatsProfile = {
  id: string;
  name: string;
  avatar?: string;
  isAI: boolean;
  isBlocked?: boolean;
};

export type LoadChatsActionPayload = {
  chatId: string;
  profiles: LoadChatsProfile[]
};

export type LoadChatsAction = {
  payload: LoadChatsActionPayload[];
};

export type ChatMessageActionPayload = {
  chatId: string;
  senderId: string;
  audioId?: number;
  isAudio?: boolean;
  message: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AddNewChatMessageAction = {
  payload: ChatMessageActionPayload
}