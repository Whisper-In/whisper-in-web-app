import Profile from "@/app/mobile/(pages)/profile/[profileId]/page";
import Modal from "@/app/mobile/_components/modal.component";

export default function ProfileModal(props
    : { params: { profileId: string }, searchParams: { [key: string]: string } }) {
    return (
        <Modal>
            <Profile {...props} />
        </Modal>
    )
}