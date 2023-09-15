"use client"

import classNames from "classnames";
import Chat from "./chat.component";
import { IUserChatRawDto } from "@/server-dtos/chats/chats.server-dtos";
import { useAppDispath, useAppSelector } from "@/store/hooks";
import { fetchChats } from "@/store/thunks/chats.thunks";
import { useEffect, useRef } from "react";

export default function ChatList({ className }
    : { className?: string }) {
    const me = useAppSelector((state) => state.user.me)!;    

    const chatList = useAppSelector((state) => state.chats.chats);

    const dispatch = useAppDispath();

    useEffect(() => {
        if (me) {
            console.log("Name:", me.name);
            dispatch(fetchChats(me._id));
        }
    }, [me]);

    return (
        <div className={classNames(
            "overflow-y-auto",
            className
        )}>
            {
                chatList.map((chat, idx) =>
                    <Chat key={idx} chat={chat} />)
            }
        </div>
    )
}