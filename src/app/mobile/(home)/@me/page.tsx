import PostTabs from "../../(pages)/profile/[profileId]/_component/post-tabs.component";
import * as userServerService from "@/server-services/user/user.server-service";
import { notFound } from "next/navigation";
import SettingsMenu from "./_components/settings-menu.component";
import dynamic from "next/dynamic";

const MyProfileInfo = dynamic(
    () => import("./_components/profile-info.component"),
    { ssr: false })

export default async function Me() {
    const profile = await userServerService.getUserProfile()
        .catch(() => {
            return notFound();
        });

    return (
        <main className="h-full flex flex-col relative">
            <SettingsMenu className="absolute top-10 right-5" />

            <MyProfileInfo />

            <PostTabs className="grow" profileId={profile._id} />
        </main>
    );
}