import { notFound } from "next/navigation";
import StatItem from "./_component/stat-item.component";
import SubscribeButton from "./_component/subscribe-button.component";
import * as profileService from "@/store/services/profile/profile.service";
import { Tab, Tabs } from "@mui/material";
import PostTabs from "./_component/post-tabs.component";
import BackButton from "@/app/_components/back-button.component";
import ProfileInfo from "./_component/profile-info.component";

export default async function Profile({
    params,
    searchParams
}: {
    params: { profileId: string },
    searchParams: { [key: string]: string },
}) {
    return (
        <main className="h-full flex flex-col">
            <BackButton className="absolute top-14 left-5" />

            <ProfileInfo profileId={params.profileId} />

            <PostTabs className="grow" profileId={params.profileId} />
        </main>
    );
}