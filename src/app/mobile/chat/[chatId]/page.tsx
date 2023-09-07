export default function Chat(props: { params: { chatId: string } }) {
    return (
        <main>
            {props.params.chatId}
        </main>
    )
}