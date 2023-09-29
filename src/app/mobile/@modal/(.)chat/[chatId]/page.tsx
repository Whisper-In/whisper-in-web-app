import Chat from "@/app/mobile/(pages)/chat/[chatId]/page";
import Modal from "@/app/mobile/_components/modal.component";

export default function ChatModal(props: { params: { chatId: string } }) {
    return (
        <Modal>
            <Chat {...props} />
        </Modal>
    );
}