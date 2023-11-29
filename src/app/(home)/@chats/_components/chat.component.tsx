"use client"

import { useAppSelector } from "@/store/hooks";
import { Chat } from "@/store/states/chats.states";
import { convertToMessageDate } from "@/utils/datetime.util";
import { Avatar, Box, ListItem, ListItemButton, Typography } from "@mui/material";
import Link from "next/link";

export default function ChatPage({ chat }
    : { chat: Chat }) {
    const me = useAppSelector((state) => state.user.me)!;
    const profile = chat.profiles.findLast((profile) => profile?.id != me?._id);

    const lastMessage = chat.lastMessage?.message;
    const messageDateTime = chat.lastMessage?.createdAt;

    return (
        <ListItem disablePadding={true} suppressHydrationWarning={true}>
            <ListItemButton sx={{
                display: "flex",
                alignItems: "stretch",
                padding: 2,
                gap: 2
            }}>
                <Link href={`/profile/${profile?.id}`}>
                    <Avatar src={profile?.avatar} sx={{ width: 50, height: 50 }} />
                </Link>

                <Link href={`/chat/${chat.chatId}`} className="grow">
                    <div className="flex items-center">
                        <label className="grow font-bold text-lg">{profile?.name}</label>
                        <label className="text-sm">{convertToMessageDate(messageDateTime)}</label>
                    </div>
                    {
                        lastMessage &&
                        <Typography variant="caption"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {lastMessage}
                        </Typography>
                    }
                </Link>
            </ListItemButton>
        </ListItem>
    );
}