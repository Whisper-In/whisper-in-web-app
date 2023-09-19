import Chat from "@/app/mobile/(pages)/chat/[chatId]/page";

export default function ChatModal(props: { params: { chatId: string } }) {
    return Chat(props);
}