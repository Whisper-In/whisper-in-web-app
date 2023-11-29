"use client"

import { useEffect, useState } from "react";
import * as postService from "@/store/services/content/post.service";
import { IPostDto } from "@/dtos/content/post.dtos";
import RecommendedTypesNav from "./_components/recommended-types.component";
import classNames from "classnames";
import PostFeed from "./_components/post-feed.component";
import { useGetRecommendedPosts } from "@/store/hooks/content.hooks";

export type RecommendedTypes = "FOLLOWING" | "FORYOU";

export default function MobileHome() {
    const [recommendedType, setRecommendedType] = useState<RecommendedTypes>("FORYOU");
    const postsPerLoad = 10;

    const {
        data: forYouPosts,
        isLoading: isForYouPostsLoading,
        size: forYouPostsSize,
        setSize: forYouPostsSetSize,
    } = useGetRecommendedPosts(postsPerLoad)

    const {
        data: followingPosts,
        isLoading: isFollowingPostsLoading,
        size: followingPostsSize,
        setSize: followingPostsSetSize
    } = useGetRecommendedPosts(postsPerLoad, true)

    const onForYouScrollEnd = (() => {
        if (recommendedType == "FORYOU") {
            if (!isForYouPostsLoading) {
                console.log("For you post scroll end...");
                forYouPostsSetSize(forYouPostsSize + 1);
            }
        }
    })

    return (
        <main className="h-full bg-black overflow-hidden relative">
            <RecommendedTypesNav className={`absolute top-sat pt-5 left-1/2 -translate-x-1/2 z-10`}
                onRecommendTypeChange={(recommendedType) => setRecommendedType(recommendedType)}
                currentRecommendedType={recommendedType} />

            <PostFeed className={classNames({
                "hidden": recommendedType != "FOLLOWING"
            })} posts={followingPosts?.flat()}
                isLoading={isFollowingPostsLoading}
                onScrollEnd={() => recommendedType == "FOLLOWING" && !isFollowingPostsLoading && followingPostsSetSize(followingPostsSize + 1)}
                placeholder="No posts found. Follow someone now to view their latest posts in your feed." />

            <PostFeed className={classNames({
                "hidden": recommendedType != "FORYOU"
            })} posts={forYouPosts?.flat()}
                isLoading={isForYouPostsLoading}
                onScrollEnd={onForYouScrollEnd}
                placeholder="No posts found." />
        </main >
    );
}