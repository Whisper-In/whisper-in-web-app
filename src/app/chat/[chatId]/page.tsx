import { Stack } from "@mui/material";
import ChatSection from "./_components/chat-section.component";

export default function Chat({ params }: { params: { chatId: string } }) {
    return (
        <Stack flexGrow={1}>
            <ChatSection chatId={params.chatId} />
        </Stack>
    )
}