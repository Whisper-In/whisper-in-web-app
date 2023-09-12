import Header from "../../_components/header.component"
import ChatList from "./_components/chat-list.component";

export default async function Chats() {
    return (
        <main className="w-full h-full flex flex-col">
            <Header title="Chats" />

            <ChatList />
        </main>
    )
}