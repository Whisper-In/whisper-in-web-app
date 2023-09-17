import { notFound } from "next/navigation";
import StatItem from "./_component/stat-item.component";
import SubscribeButton from "./_component/subscribe-button.component";
import * as profileServerService from "@/server-services/profile/profile.server-service";
import { Tab, Tabs } from "@mui/material";
import PostTabs from "./_component/post-tabs.component";
import BackButton from "@/app/mobile/_components/back-button.component";
import ProfileInfo from "./_component/profile-info.component";

export default async function Profile({ params, searchParams }
    : { params: { profileId: string }, searchParams: { [key: string]: string } }) {
    const { profileId } = params;
    
    const profile = await profileServerService.getProfile(profileId, true)
        .catch(() => {
            return notFound();
        });

    if (!profile) {
        return notFound();
    }    

    return (
        <main className="h-screen flex flex-col">
            <BackButton className="absolute top-5 left-5"/>

            <ProfileInfo profile={profile} />

            <PostTabs className="grow" profileId={profile.id} />
        </main>
    );
}