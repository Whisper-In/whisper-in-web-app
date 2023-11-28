import Profile from "@/app/profile/(profileId)/[profileId]/page";
import Modal from "@/app/_components/modal.component";

export default function ProfileModal(props
    : { params: { profileId: string }, searchParams: { [key: string]: string } }) {
    return (
        <Modal>
            <Profile {...props} />
        </Modal>
    )
}