"use client"

import { IUserChatDto } from "@/dtos/chats/chats.dtos";
import { useAppSelector } from "@/store/hooks";
import { convertToMessageDate } from "@/utils/datetime.util";
import { Avatar, Box, ListItem, ListItemButton, Typography } from "@mui/material";
import Link from "next/link";

export default function ChatListItem({ chat }
    : { chat: IUserChatDto }) {
    const profile = chat.profile;

    const lastMessage = chat.lastMessage?.message;
    const messageDateTime = chat.lastMessage?.createdAt;

    return (
        <ListItem disablePadding={true}
            suppressHydrationWarning={true}>
            <ListItemButton sx={{
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                my: 1,
                px: 2,
                py: 0,
                gap: 2
            }}>
                <Link href={`/profile/${profile?._id}`}>
                    <Avatar src={profile?.avatar} sx={{ width: 50, height: 50 }} />
                </Link>

                <Link href={`/chat/${chat.chatId}`} className="grow py-4" >
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