import PostPage from "@/app/post/[postId]/page";
import Modal from "@/app/_components/modal.component";

export default function PostPageModal(props
    : { params: { postId: string }, searchParams: { [key: string]: string | string[] } }) {
    return (
        <Modal>
            <PostPage {...props} />
        </Modal>
    );
}