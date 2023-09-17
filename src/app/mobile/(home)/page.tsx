"use client"

import { useEffect, useState } from "react";
import * as postService from "@/app/_client-services/content/post.service";
import { IPostDto } from "@/dtos/content/post.dtos";
import RecommendedTypesNav from "./_components/recommended-types.component";
import classNames from "classnames";
import PostFeed from "./_components/post-feed.component";

export type RecommendedTypes = "FOLLOWING" | "FORYOU";

export default function MobileHome() {
    const [recommendedType, setRecommendedType] = useState<RecommendedTypes>("FORYOU");
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedPosts, setRecommendedPosts] = useState<IPostDto[]>([]);
    const [followingPosts, setFollowingPosts] = useState<IPostDto[]>([]);
    const postsPerLoad = 10;
    const maxFilterPostIds = 100;

    useEffect(() => {
        loadMore("FORYOU");
        loadMore("FOLLOWING");
    }, []);

    const loadMore = (_recommendedType: RecommendedTypes) => {
        if (isLoading) {
            return;
        }

        const initialiPosts = _recommendedType == "FORYOU" ? recommendedPosts : followingPosts;

        const filterPostIds = initialiPosts?.length ? initialiPosts.map((post) => post._id) : undefined;
        filterPostIds?.splice(0, filterPostIds.length - maxFilterPostIds);

        setIsLoading(true);

        postService.getRecommendedPosts(postsPerLoad, filterPostIds, _recommendedType == "FOLLOWING").then((posts) => {
            const newPosts = initialiPosts.concat(posts);

            if (_recommendedType == "FORYOU") {
                setRecommendedPosts(newPosts);
            } else {
                setFollowingPosts(newPosts)
            }
        }).catch((error) => { console.log(error) })
            .finally(() => setIsLoading(false));
    }

    return (
        <main className="h-full bg-black relative">
            <RecommendedTypesNav className="absolute top-10 left-1/2 -translate-x-1/2 z-10"
                onRecommendTypeChange={(recommendedType) => setRecommendedType(recommendedType)}
                currentRecommendedType={recommendedType} />

            <PostFeed className={classNames({
                "hidden": recommendedType != "FOLLOWING"
            })} posts={followingPosts} onScrollEnd={() => loadMore("FOLLOWING")} />

            <PostFeed className={classNames({
                "hidden": recommendedType != "FORYOU"
            })} posts={recommendedPosts} onScrollEnd={() => loadMore("FORYOU")} />
        </main >
    );
}