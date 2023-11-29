import Loading from "@/app/post/[postId]/loading";
import Modal from "@/app/_components/modal.component";

export default function PostModalLoading() {
    return (
        <Modal>
            <Loading />
        </Modal>
    );
}