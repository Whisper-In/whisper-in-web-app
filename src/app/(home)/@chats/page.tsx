import dynamic from "next/dynamic";
import Header from "../../_components/header.component";

const ChatList = dynamic(() => import("./_components/chat-list.component"), { ssr: false });

export default async function Chats() {
    return (
        <main className="w-full h-full flex flex-col">
            <Header title="Chats" />

            <ChatList />
        </main>
    )
}