import { getUserChats } from "@/server-services/chats/chats.server-service"
import Header from "../../_components/header.component"
import { cookies } from "next/headers"
import { getUser } from "@/utils/cookies.util";
import ChatList from "./_components/chat-list.component";

export default async function Chats() {
    const requestCookies = cookies();
    const user = getUser(requestCookies);

    const chatList = await getUserChats(user!._id);    

    return (
        <main className="w-full h-full flex flex-col">
            <Header>
                <label className="font-bold text-xl text-onSurface">Chats</label>
            </Header>

            <ChatList chatList={chatList}/>
        </main>
    )
}