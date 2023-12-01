"use client"

import PostTabs from "@/app/profile/[profileId]/_component/post-tabs.component";
import { useAppSelector } from "@/store/hooks";

export default function MyPostTabs() {
    return (
        <PostTabs className="grow"/>
    );
}