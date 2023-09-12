import { createSlice } from "@reduxjs/toolkit";
import * as chatsReducers from "../reducers/chats.reducers";
import { ChatsState } from "../states/chats.states";
import { fetchChatCompletion, fetchChats } from "../thunks/chats.thunks";

const initialState: ChatsState = {
    chats: [],
};

export const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addNewChatMessage: chatsReducers.addNewChatMessage,
        toggleAudioReplies: chatsReducers.toggleChatAudioReplies,
        updateChatFeatures: chatsReducers.updateChatFeatures
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChats.fulfilled, chatsReducers.loadChatsReducer);
        builder.addCase(fetchChatCompletion.fulfilled, chatsReducers.addNewChatMessage);
    }
});

export const {
    addNewChatMessage,
    toggleAudioReplies,
    updateChatFeatures
} = chatSlice.actions;

export default chatSlice.reducer;