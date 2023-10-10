import { createSlice } from "@reduxjs/toolkit";
import * as chatsReducers from "../reducers/chats.reducers";
import { ChatsState } from "../states/chats.states";
import { fetchChatCompletion, fetchChatMessages, fetchChats, insertNewUserChatMessage } from "../thunks/chats.thunks";

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
        builder.addCase(fetchChatMessages.fulfilled, chatsReducers.loadChatMessages)
        builder.addCase(fetchChatCompletion.fulfilled, chatsReducers.addNewChatMessage);
        builder.addCase(insertNewUserChatMessage.fulfilled, chatsReducers.addNewChatMessage);
    }
});

export const {
    addNewChatMessage,
    toggleAudioReplies,
    updateChatFeatures
} = chatSlice.actions;

export default chatSlice.reducer;