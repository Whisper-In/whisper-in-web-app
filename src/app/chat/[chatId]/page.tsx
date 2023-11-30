import ChatSection from "./_components/chat-section.component";

export default async function Chat({ params }: { params: { chatId: string } }) {
    return (
        <main className="h-full w-full flex flex-col">
            <ChatSection chatId={params.chatId} />
        </main>
    )
}