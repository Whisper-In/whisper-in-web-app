"use client"

import StatItem from "@/app/profile/[profileId]/_component/stat-item.component";
import { useScrollVertical } from "@/hooks/scroll.hook";
import { useGetUserProfile } from "@/store/hooks/user.hooks";
import { Avatar, Collapse } from "@mui/material";
import SettingsMenu from "./settings-menu.component";

export default function MyProfileInfo() {
    const { data: me } = useGetUserProfile();

    return (
        <div className="flex flex-col items-center gap-3 pt-14 px-5 mb-3 relative">
            <Avatar alt="avatar"
                src={me?.avatar}
                sx={{ width: 96, height: 96 }} />

            <div className="text-lg italic">
                @{me?.userName}
            </div>

            <div className="flex justify-center gap-12 mb-3">
                <StatItem label="Posts" value={me?.postCount ?? 0} />
                <StatItem label="Followers" value={me?.followerCount ?? 0} />
                <StatItem label="Likes" value={me?.totalLikeCount ?? 0} />
            </div>

            <SettingsMenu className="absolute top-sat pt-5 right-5" />
        </div>
    );
}