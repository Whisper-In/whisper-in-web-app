"use client"

import StatItem from "@/app/profile/[profileId]/_component/stat-item.component";
import { useAppSelector } from "@/store/hooks";
import { useGetUserProfile } from "@/store/hooks/user.hooks";
import { Avatar } from "@mui/material";

export default function MyProfileInfo() {
    const { data: me } = useGetUserProfile();

    return (
        <div className="flex flex-col items-center gap-3 pt-14 px-5 mb-3">
            <Avatar src={me?.avatar} sx={{ width: 96, height: 96 }} />

            <div className="text-lg italic">
                @{me?.userName}
            </div>
            <div className="flex justify-center gap-12 mb-3">
                <StatItem label="Posts" value={me?.postCount ?? 0} />
                <StatItem label="Followers" value={me?.followerCount ?? 0} />
                <StatItem label="Likes" value={me?.totalLikeCount ?? 0} />
            </div>
        </div>
    );
}