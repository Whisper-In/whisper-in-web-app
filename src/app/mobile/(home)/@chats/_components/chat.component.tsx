import { IUserChatDto } from "@/server-dtos/chats/chats.server-dtos";
import { getUser } from "@/utils/cookies.util";
import { Avatar } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Chat({ chat }
    : { chat: IUserChatDto }) {
    const user = getUser(cookies());
    const userProfile = chat.profiles.findLast((profile) => profile._id != user?._id);

    const lastMessage: string | undefined = undefined;
    const messageDateTime: string | undefined = undefined;

    return (
        <Link href={`/chat/${chat.chatId}`} className="flex items-center gap-5 p-5 transition active:bg-black/10">
            <Avatar src={userProfile?.avatar} sx={{ width: 50, height: 50 }} />
            <div className="grow">
                <div className="flex items-center">
                    <label className="grow font-bold text-lg">{userProfile?.name}</label>
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