"use client"
import ChatListItem from "./chat-list-item.component";
import { IUserChatRawDto } from "@/dtos/chats/chats.dtos";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchChats } from "@/store/thunks/chats.thunks";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ChatList({ className }: { className?: string }) {
    const me = useAppSelector((state) => state.user.me);
    const chats = useAppSelector((state) => state.chats.chats);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (me) {
            dispatch(fetchChats());
        }
    }, [me]);

    if (!chats.length) {
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