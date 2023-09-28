import Header from "../../_components/header.component";
import ChatList from "./_components/chat-list.component";
import * as chatServerService from "@/server-services/chats/chats.server-service";

export default async function Chats() {
    const chatList = await chatServerService.getUserChats()

    return (
        <main className="w-full h-full flex flex-col">
            <Header title="Chats" />

            <ChatList rawChatList={chatList}/>
        </main>
    )
}