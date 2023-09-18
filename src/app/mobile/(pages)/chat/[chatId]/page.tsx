import ChatSection from "./_components/chat-section.component";
import * as chatServerService from "@/server-services/chats/chats.server-service";
import { notFound } from "next/navigation";
import Loading from "./loading";

export default async function Chat(props: { params: { chatId: string } }) {
    const chat = await chatServerService.getChat(props.params.chatId);
    
    if (!chat.chatId) {
        return notFound();
    }

    return (
        <main className="h-full w-full flex flex-col">            
            <ChatSection chat={chat} />
        </main>
    )
}