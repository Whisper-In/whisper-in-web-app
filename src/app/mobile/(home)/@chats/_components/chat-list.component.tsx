"use client"

import classNames from "classnames";
import Chat from "./chat.component";
import { IUserChatRawDto } from "@/dtos/chats/chats.dtos";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchChats } from "@/store/thunks/chats.thunks";
import { useEffect, useRef } from "react";
import { List, ListItem } from "@mui/material";
import { Chat as ChatState } from "@/store/states/chats.states";

export default function ChatList({ className, rawChatList }
    : { className?: string, rawChatList: IUserChatRawDto[] }) {
    const me = useAppSelector((state) => state.user.me)!;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (me) {            
            dispatch(fetchChats());
        }
    }, [me]);

    return (
        <List disablePadding={true}>
            {
                rawChatList.map((chat, idx) =>
                    <Chat key={idx} chat={chat} />)
            }
        </List>
    )
}