import PostTabs from "./_component/post-tabs.component";
import BackButton from "@/app/_components/back-button.component";
import ProfileInfo from "./_component/profile-info.component";
import { createContext, useContext } from "react";
import { ScrollDirection } from "@/hooks/scroll.hook";

export default async function Profile({
    params,
    searchParams
}: {
    params: { profileId: string },
    searchParams: { [key: string]: string },
}) {
    return (
        <main className="w-full h-full flex flex-col">
            <BackButton />

            <ProfileInfo profileId={params.profileId} />

            <PostTabs className="grow" profileId={params.profileId} />
        </main>
    );
}