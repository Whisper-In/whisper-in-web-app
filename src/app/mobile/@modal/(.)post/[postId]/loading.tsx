import Loading from "@/app/mobile/(pages)/post/[postId]/loading";
import Modal from "@/app/mobile/_components/modal.component";

export default function PostModalLoading() {
    return (
        <Modal>
            <Loading />
        </Modal>
    );
}