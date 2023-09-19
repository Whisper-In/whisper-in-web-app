import Profile from "@/app/mobile/(pages)/profile/[profileId]/page";

export default function ProfileModal({ params, searchParams }
    : { params: { profileId: string }, searchParams: { [key: string]: string } }) {
    return Profile({ params, searchParams });
}