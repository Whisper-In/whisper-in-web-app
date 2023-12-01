export type LoadChatsProfile = {
  _id: string;
  name: string;
  avatar?: string;
  isBlocked?: boolean;
};

export type LoadChatsActionPayload = {
  chatId: string;
  isAudioOn:boolean;
  lastMessage: ChatMessageActionPayload;
  profile: LoadChatsProfile
};

export type LoadChatsAction = {
  payload: LoadChatsActionPayload[];
};

export type ChatMessageActionPayload = {
  chatId: string;
  sender: string;
  messageId?: string;
  isAudio?: boolean;
  message: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AddNewChatMessageAction = {
  payload: ChatMessageActionPayload
}

export type UpdateChatMessageAction = {
  payload: { position: number } & ChatMessageActionPayload
}

export type LoadChatMessagesPayload = {
  chatId: string;
  messages: ChatMessageActionPayload[];
  totalMessages: number;
  clearMessages?:boolean;
}