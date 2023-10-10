import { createSlice } from "@reduxjs/toolkit";
import * as chatsReducers from "../reducers/chats.reducers";
import { ChatsState } from "../states/chats.states";
import { fetchChatCompletion, fetchChatMessages, fetchChats, insertNewUserChatMessage, setChatAudioReply } from "../thunks/chats.thunks";

const initialState: ChatsState = {
    chats: [],
};

export const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addNewChatMessage: chatsReducers.addNewChatMessage,
        updateChatFeatures: chatsReducers.updateChatFeatures
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChats.fulfilled, chatsReducers.loadChatsReducer);
        builder.addCase(fetchChatMessages.fulfilled, chatsReducers.loadChatMessages)
        builder.addCase(fetchChatCompletion.fulfilled, chatsReducers.addNewChatMessage);
        builder.addCase(insertNewUserChatMessage.fulfilled, chatsReducers.addNewChatMessage);
        builder.addCase(setChatAudioReply.fulfilled, chatsReducers.toggleChatAudioReplies)
    }
});

export const {
    addNewChatMessage,    
    updateChatFeatures
} = chatSlice.actions;

export default chatSlice.reducer;