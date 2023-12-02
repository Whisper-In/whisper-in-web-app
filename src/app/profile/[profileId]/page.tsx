import PostTabs from "./_component/post-tabs.component";
import BackButton from "@/app/_components/back-button.component";
import ProfileInfo from "./_component/profile-info.component";
import { Stack } from "@mui/material";

export default async function Profile({
    params
}: {
    params: { profileId: string }
}) {
    return (
        <Stack flexGrow={1}>
            <BackButton />

            <ProfileInfo profileId={params.profileId} />

            <PostTabs className="grow" profileId={params.profileId} />
        </Stack>
    );
}