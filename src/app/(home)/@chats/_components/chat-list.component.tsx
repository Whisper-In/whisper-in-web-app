"use client"

import { useSpinner } from "@/app/_components/spinner.component";
import ChatListItem from "./chat-list-item.component";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetChatMessages, useGetUserChats } from "@/store/hooks/chat.hooks";
import { fetchChats } from "@/store/thunks/chats.thunks";
import { Box, CircularProgress, List, ListItem, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ChatList({ className }: { className?: string }) {
    const { data: chats, isLoading, mutate: updateChats } = useGetUserChats();
    const { showSpinner } = useSpinner();

    useEffect(() => {
        showSpinner(isLoading);
    }, [isLoading])

    if(isLoading) {
        return null;
    }

    if (!chats?.length) {
        return (
            <Typography sx={{
                mt: 2,
                textAlign: "center",
                opacity: 0.3
            }}>
                No chats.
            </Typography>
        )
    }

    return (
        <List disablePadding={true}>
            {
                chats.map((chat, idx) =>
                    <ChatListItem key={idx} chat={chat} />)
            }
        </List>
    )
}