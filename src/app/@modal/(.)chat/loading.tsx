import Modal from "../../_components/modal.component";
import Loading from "@/app/chat/[chatId]/loading";

export default function ChatModalLoading() {
    return (
        <Modal>
            <Loading/>
        </Modal>
    );
}