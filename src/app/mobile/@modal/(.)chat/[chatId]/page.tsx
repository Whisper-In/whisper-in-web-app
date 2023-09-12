import Chat from "@/app/mobile/chat/[chatId]/page";

export default function ProfileModal({ params }
    : { params: { chatId: string } }) {
    return (
        <div className="w-full h-full">
            <Chat params={params} />
        </div>
    )
}