import dynamic from "next/dynamic";
import Header from "../../_components/header.component";
import { Stack } from "@mui/material";

const ChatList = dynamic(() => import("./_components/chat-list.component"), { ssr: false });

export default async function Chats() {
    return (
        <Stack flexGrow={1}>
            <Header title="Chats" />

            <ChatList />
        </Stack>
    )
}