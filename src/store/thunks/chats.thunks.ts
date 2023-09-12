import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChatMessageActionPayload,
  LoadChatsActionPayload,
  LoadChatsProfile,
} from "../types/chats.types";
import * as chatGPTService from "@/app/_client-services/chat/chat-gpt.client-service";
//import * as elevenLabsService from "../../services/elevenLabsService";
import * as chatService from "@/app/_client-services/chat/chat.client-service";
import OpenAI from "openai";
import { RootState } from "@/store/store";

export const fetchChats = createAsyncThunk<LoadChatsActionPayload[] | any, string>(
  "chats/fetchChats",
  async (userId: string) => {
    let payload: LoadChatsActionPayload[] = [];

    try {      
      const userChats = await chatService.getUserChats(userId);
      payload = userChats.map((userChat) => ({
        chatId: userChat.chatId,
        profiles: userChat.profiles.map<LoadChatsProfile>((profile) => ({
          id: profile._id,
          name: profile.name,
          avatar: profile.avatar,
          isAI: profile.isAI,
          isBlocked: profile.isBlocked
        })),
      }));
    } catch (error) {
      console.log(error);
      return { error };
    }

    return payload;
  }
);

export const fetchChatCompletion = createAsyncThunk<
  ChatMessageActionPayload,
  { chatId: string; contactId: string; message: string },
  { state: RootState }
>(
  "chats/getChatCompletion",
  async (
    props: { chatId: string; contactId: string; message: string },
    { getState }
  ) => {
    let payload: ChatMessageActionPayload = {
      chatId: props.chatId,
      senderId: props.contactId,
      message: "",
      audioUrl: "",
      createdAt: "",
      updatedAt: "",
    };

    try {
      const chats = getState().chats;
      const chat = chats.chats.find((c) => c.chatId == props.chatId);
      let prevChatMessages = chat?.messages ?? [];

      const chatGPTResult = await chatGPTService.getChatCompletion(
        props.contactId,
        props.message,
        prevChatMessages
          .slice(-chatGPTService.MAX_PREV_MESSAGES_LIMIT)
          .map<OpenAI.Chat.ChatCompletionMessage>((item) => ({
            role: item.senderId != props.contactId ? "user" : "assistant",
            content: item.message,
          }))
      );

      // let textToSpeechResult;
      // if (chat?.features?.includes(ChatFeature.AUDIO) && !chat?.isAudioRepliesOff) {
      //   textToSpeechResult = await elevenLabsService.getTextToSpeech(
      //     props.contactId,
      //     chatGPTResult.message
      //   );
      // }

      const createdAt = new Date().toString();

      payload = {
        chatId: props.chatId,
        senderId: props.contactId,
        message: chatGPTResult.message,
        //audioUrl: textToSpeechResult?.data,
        createdAt,
        updatedAt: createdAt,
      };
    } catch (error) {
      console.log(error);
    }

    return payload;
  }
);
