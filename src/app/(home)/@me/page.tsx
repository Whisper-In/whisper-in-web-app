import { Stack } from "@mui/material";
import MyProfileInfo from "./_components/profile-info.component";
import PostTabs from "@/app/profile/[profileId]/_component/post-tabs.component";

export default async function Me() {
    return (
        <Stack flexGrow={1}>
            <MyProfileInfo />

            <PostTabs className="grow" />
        </Stack>
    );
}