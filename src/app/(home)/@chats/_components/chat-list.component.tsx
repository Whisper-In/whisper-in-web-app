"use client"

import ChatListItem from "./chat-list-item.component";
import { useGetUserChats } from "@/store/hooks/chat.hooks";
import { List, Typography } from "@mui/material";

export default function ChatList({ className }: { className?: string }) {
    const { data: chats, isLoading, mutate: updateChats } = useGetUserChats();
        
    if(isLoading) {
        return null;
    }

    if (!chats?.length) {
        return (
            <Typography sx={{
                mt: 2,
                mx: 5,
                textAlign: "center",
                opacity: 0.3
            }}>
                No chats. Subscribe to any users and start chatting with their AI now.
            </Typography>
        )
    }    

    return (
        <List disablePadding={true} role="list">
            {
                chats.map((chat, idx) =>
                    <ChatListItem key={idx} chat={chat} />)
            }
        </List>
    )
}