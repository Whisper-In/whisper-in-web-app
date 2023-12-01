import SettingsMenu from "./_components/settings-menu.component";
import dynamic from "next/dynamic";
import MyPostTabs from "./_components/post-tabs.component";
import MyProfileInfo from "./_components/profile-info.component";

export default async function Me() {
    return (
        <main className="h-full flex flex-col relative">
            <MyProfileInfo />

            <MyPostTabs />
        </main>
    );
}