import { notFound } from "next/navigation";
import StatItem from "./_component/stat-item.component";
import SubscribeButton from "./_component/subscribe-button.component";
import * as profileServerService from "@/server-services/profile/profile.server-service";
import { Tab, Tabs } from "@mui/material";
import PostTabs from "./_component/post-tabs.component";
import BackButton from "@/app/mobile/_components/back-button.component";

export default async function Profile({ params, searchParams }
    : { params: { profileId: string }, searchParams: { [key: string]: string } }) {
    const { profileId } = params;    
    const isAI = searchParams["isAI"] == "true";
    const profile = await profileServerService.getProfile(profileId, isAI)
    .catch(() => {
        return notFound();
    });

    if(!profile) {
        return notFound();
    }

    const price = profile.priceTiers?.length > 0 ? profile.priceTiers[0].price : 0;
    
    return (
        <main className="h-screen flex flex-col">
            <BackButton />

            <div className="flex flex-col items-center gap-3 pt-10 px-5 mb-3">
                <div className="rounded-full w-[96px] h-[96px] overflow-hidden">
                    <img className="object-cover bg-secondary w-full h-full" src={profile.avatar} />
                </div>

                <div className="text-lg italic">
                    @{profile.userName}
                </div>
                <div className="flex justify-center gap-12 mb-3">
                    <StatItem label="Posts" value={profile.postCount ?? 0} />
                    <StatItem label="Followers" value={profile.followerCount ?? 0} />
                    <StatItem label="Likes" value={profile.totalLikeCount ?? 0} />
                </div>

                <SubscribeButton isSubscribed={profile.isSubscribed} price={price} />
            </div>

            <PostTabs className="grow" profileId={profile.id} />
        </main>
    );
}