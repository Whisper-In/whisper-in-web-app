import Loading from "@/app/mobile/(pages)/chat/[chatId]/loading";
import Modal from "@/app/mobile/_components/modal.component";

export default function ChatModalLoading() {
    return (
        <Modal>
            <Loading />
        </Modal>
    )
}