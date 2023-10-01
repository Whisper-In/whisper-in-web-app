"use client"

import { IUserChatRawDto } from "@/dtos/chats/chats.dtos";
import { useAppSelector } from "@/store/hooks";
import { Chat } from "@/store/states/chats.states";
import { Avatar, ListItem, ListItemButton } from "@mui/material";
import Link from "next/link";

export default function Chat({ chat }
    : { chat: Chat }) {    
    const me = useAppSelector((state) => state.user.me)!;
    const profile = chat.profiles.findLast((profile) => profile?.id != me?._id);

    const lastMessage: string | undefined = undefined;
    const messageDateTime: string | undefined = undefined;

    return (
        <ListItem disablePadding={true} suppressHydrationWarning={true}>
            <ListItemButton sx={{
                display: "flex",
                gap: 2,
                padding: 2
            }}>
                <Link href={`/profile/${profile?.id}`}>
                    <Avatar src={profile?.avatar} sx={{ width: 50, height: 50 }} />
                </Link>

                <Link href={`/mobile/chat/${chat.chatId}`} className="grow">
                    <div className="flex items-center">
                        <label className="grow font-bold text-lg">{profile?.name}</label>
                        <label className="text-sm">{messageDateTime}</label>
                    </div>
                    {
                        lastMessage &&
                        <div>{lastMessage}</div>
                    }
                </Link>
            </ListItemButton>
        </ListItem>
    );
}