"use client"

import PostTabs from "@/app/mobile/(pages)/profile/[profileId]/_component/post-tabs.component";
import { useAppSelector } from "@/store/hooks";

export default function MyPostTabs() {
    const me = useAppSelector((state) => state.user.me);    

    return (
        <PostTabs className="grow" profileId={me?._id} />
    );
}