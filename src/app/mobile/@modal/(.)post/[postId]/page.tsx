import PostPage from "@/app/mobile/(pages)/post/[postId]/page";
import Modal from "@/app/mobile/_components/modal.component";

export default function PostPageModal(props
    : { params: { postId: string }, searchParams: { [key: string]: string | string[] } }) {
    return (
        <Modal>
            <PostPage {...props} />
        </Modal>
    );
}