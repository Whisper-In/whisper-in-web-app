import dynamic from "next/dynamic";
import Header from "../../_components/header.component";
import { Stack } from "@mui/material";
import InfoButton from "./_components/info-button.component";

const ChatList = dynamic(() => import("./_components/chat-list.component"), { ssr: false });

export default function Chats() {
    return (
        <Stack flexGrow={1}>
            <Header title="Chats" rightComponent={<InfoButton />} />

            <ChatList />
        </Stack>
    )
}