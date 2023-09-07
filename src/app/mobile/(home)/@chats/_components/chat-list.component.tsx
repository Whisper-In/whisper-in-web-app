import classNames from "classnames";
import Chat from "./chat.component";
import { IUserChatDto } from "@/server-dtos/chats/chats.server-dtos";

export default function ChatList({ className, chatList }
    : { className?: string, chatList: IUserChatDto[] }) {
    return (
        <div className={classNames(
            "overflow-y-auto",
            className
        )}>
            {
                chatList.map((chat) => <Chat chat={chat} />)
            }
        </div>
    )
}