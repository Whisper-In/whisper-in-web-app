import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChatMessageActionPayload,
  LoadChatMessagesPayload,
  LoadChatsActionPayload,
  LoadChatsProfile,
} from "../types/chats.types";
import * as elevenLabsService from "@/store/services/chat/eleven-labs.service";
import * as chatService from "@/store/services/chat/chat.service";
import { RootState } from "@/store/store";

export const fetchChats = createAsyncThunk<LoadChatsActionPayload[] | any>(
  "chats/fetchChats",
  async () => {
    let payload: LoadChatsActionPayload[] = [];

    try {
      const userChats = await chatService.getUserChats();

      payload = userChats.map((userChat) => ({
        chatId: userChat.chatId,
        lastMessage: userChat.lastMessage,
        isAudioOn: userChat.isAudioOn,
        profile: userChat.profile
      }));
    } catch (error) {
      console.log("chats/fetchChats:", error);
      throw error;
    }

    return payload;
  }
);

export const insertNewUserChatMessage = createAsyncThunk<
  ChatMessageActionPayload,
  { chatId: string, message: string },
  { state: RootState }>(
    "chats/insertNewUserChatMessage",
    async (props: { chatId: string, message: string }, { getState }) => {
      const me = getState().user.me;
      const today = new Date();

      const payload: ChatMessageActionPayload = {
        chatId: props.chatId,
        message: props.message,
        sender: me!._id,
        createdAt: today.toString(),
        updatedAt: today.toString()
      }

      try {
        chatService.insertNewChatMessage(props.chatId, me!._id, props.message);
      } catch (error) {
        throw error;
      }

      return payload;
    }
  )

export const fetchChatCompletion = createAsyncThunk<
  ChatMessageActionPayload,
  { chatId: string; contactId: string; message: string },
  { state: RootState }
>(
  "chats/fetchChatCompletion",
  async (
    props: { chatId: string; contactId: string; message: string },
    { getState }
  ) => {
    let payload: ChatMessageActionPayload = {
      chatId: props.chatId,
      sender: props.contactId,
      message: "",
      createdAt: "",
      updatedAt: "",
    };

    try {
      const chatGPTResult = await chatService.getChatCompletion(
        props.chatId,
        props.contactId,
        props.message
      );

      // const chatGPTResult = await chatService.getChatCompletionWithVectorDB(
      //   props.chatId,
      //   props.contactId,
      //   props.message
      // );

      if (chatGPTResult.isAudio) {
        try {
          await elevenLabsService.getTextToSpeechStoreInIDB(
            props.contactId,
            chatGPTResult.message,
            props.chatId,
            chatGPTResult._id
          );
        } catch (error) {
          //ignore the error here
        }
      }

      payload = {
        chatId: props.chatId,
        sender: props.contactId,
        message: chatGPTResult.message,
        messageId: chatGPTResult._id,
        isAudio: chatGPTResult.isAudio,
        createdAt: chatGPTResult.createdAt,
        updatedAt: chatGPTResult.updatedAt
      };
    } catch (error) {
      console.log("chats/fetchChatCompletion", error);
    }

    return payload;
  }
);

export const fetchChatMessages = createAsyncThunk<
  LoadChatMessagesPayload,
  {
    chatId: string,
    pageIndex: number,
    messageCount: number,
    clearMessages?: boolean
  }
>(
  "chats/fetchChatMessages",
  async (props: {
    chatId: string,
    pageIndex: number,
    messageCount: number,
    clearMessages?: boolean
  }) => {
    let payload: LoadChatMessagesPayload = {
      chatId: props.chatId,
      messages: [],
      totalMessages: 0,
      clearMessages: props.clearMessages
    };

    try {
      const result = await chatService.getChatMessages(props.chatId, props.pageIndex, props.messageCount);

      payload.messages = result.messages;
      payload.totalMessages = result.totalMessages;
    } catch (error) {
      console.log("chats/fetchChatMessages:", error);
      throw error;
    }

    return payload;
  }
);


export const setChatAudioReply = createAsyncThunk<
  {
    chatId: string,
    isAudioOn: boolean,
  },
  {
    chatId: string,
    isAudioOn: boolean
  }
>(
  "chats/setChatAudioReply",
  async (props: {
    chatId: string,
    isAudioOn: boolean
  }) => {
    try {
      const result = await chatService.setChatAudioReply(props.chatId, props.isAudioOn);

      return {
        chatId: result._id,
        isAudioOn: result.isAudioOn,
      }
    } catch (error) {
      console.log("chats/setChatAudioReply:", error);
      throw error;
    }
  }
);