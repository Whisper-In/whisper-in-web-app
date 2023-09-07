import Chat from "@/app/mobile/chat/[chatId]/page";

export default function ChatModal(props: {
    params: { chatId: string }
}) {
    return (
        <div className="w-full h-full">
            <Chat params={props.params} />
        </div>
    );
}