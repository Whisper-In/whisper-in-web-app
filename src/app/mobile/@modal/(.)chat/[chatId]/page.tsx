
import Chat from "@/app/mobile/(pages)/chat/(chatid)/[chatId]/page";
import Modal from "@/app/mobile/_components/modal.component";

export default function ChatModal(props: { params: { chatId: string } }) {
    return (
        <Modal>
            <Chat {...props} />
        </Modal>
    );
}