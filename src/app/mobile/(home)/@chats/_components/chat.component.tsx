"use client"

import { IUserChatDto } from "@/server-dtos/chats/chats.server-dtos";
import { useAppSelector } from "@/store/hooks";
import { Chat } from "@/store/states/chats.states";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Chat({ chat }
    : { chat: Chat }) {
    const router = useRouter();
    const me = useAppSelector((state) => state.user.me)!;
    const profile = chat.profiles.findLast((profile) => profile?.id != me?._id);

    const lastMessage: string | undefined = undefined;
    const messageDateTime: string | undefined = undefined;

    const openProfile = () => {        
        router.push(`/mobile/profile/${profile?.id}?isAI=${profile?.isAI}`);
    }

    return (
        <Link href={`/mobile/chat/${chat.chatId}`} className="flex items-center gap-5 p-5 transition active:bg-black/10">
            <button onClick={openProfile}>
                <Avatar src={profile?.avatar} sx={{ width: 50, height: 50 }} />
            </button>

            <div className="grow">
                <div className="flex items-center">
                    <label className="grow font-bold text-lg">{profile?.name}</label>
                    <label className="text-sm">{messageDateTime}</label>
                </div>
                {
                    lastMessage &&
                    <div>{lastMessage}</div>
                }
            </div>
        </Link>
    );
}