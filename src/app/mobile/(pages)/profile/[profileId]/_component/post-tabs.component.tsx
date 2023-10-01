"use client"

import { IPostResultsDto, PostType } from "@/dtos/content/post.dtos"
import { Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useEffect, useState } from "react"
import * as postService from "@/store/services/content/post.service"
import classNames from "classnames"
import PostList from "./post-list.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faPhotoFilm, faVideo } from "@fortawesome/free-solid-svg-icons"

export default function PostTabs({ className, profileId }
    : { className?: string, profileId?: string }) {
    const [tab, setTab] = useState<PostType>(PostType.PHOTO);
    const [photoResults, setPhotoResults] = useState<IPostResultsDto>();
    const [videoResults, setVideoResults] = useState<IPostResultsDto>();
    const postsPerLoad = 12;

    const screenWidth = typeof window !== "undefined" ? window.screen.width : 0;
    const numOfColumns = 3;
    const heightToWidthRatio = 1.33;
    const postWidth = screenWidth / numOfColumns;
    const postHeight = postWidth * heightToWidthRatio;

    const getPosts = (postType: PostType, pageIndex: number, callback: (results: IPostResultsDto) => void) => {
        if (!profileId) {
            return;
        }

        postService.getPosts(profileId, PostType[postType], pageIndex, postsPerLoad)
            .then(callback).catch((error) => { });
    }

    const loadPhotos = () => {
        const count = photoResults?.posts.length ?? 0;
        if (count < (photoResults?.totalPosts ?? Number.MAX_SAFE_INTEGER)) {
            const pageIndex = count / postsPerLoad;
            getPosts(PostType.PHOTO, pageIndex, (results) => {
                const newResult: IPostResultsDto = {
                    posts: (photoResults?.posts ?? []).concat(results.posts),
                    totalPosts: results.totalPosts
                };

                setPhotoResults(newResult);
            });
        }
    }

    const loadVideos = () => {
        const count = videoResults?.posts.length ?? 0;
        if (count < (videoResults?.totalPosts ?? Number.MAX_SAFE_INTEGER)) {
            const pageIndex = count / postsPerLoad;
            getPosts(PostType.VIDEO, pageIndex, (results) => {
                const newResult: IPostResultsDto = {
                    posts: (videoResults?.posts ?? []).concat(results.posts),
                    totalPosts: results.totalPosts
                };

                setVideoResults(newResult)
            });
        }
    }

    const onTabChange = (event: SyntheticEvent<Element, Event>, value: PostType) => {
        setTab(value);
    }

    useEffect(() => {
        loadPhotos();
        loadVideos();
    }, []);


    return (
        <div className={classNames(
            className,
            "flex flex-col"
        )}>
            <Tabs variant="fullWidth" value={tab} onChange={onTabChange}>
                <Tab icon={<FontAwesomeIcon icon={faImage} fontSize={20} />} value={PostType.PHOTO} />
                <Tab icon={<FontAwesomeIcon icon={faVideo} fontSize={20} />} value={PostType.VIDEO} />
            </Tabs>

            <PostList className={classNames(
                "grow",
                {
                    "hidden": tab != PostType.PHOTO
                }
            )} posts={photoResults?.posts} postWidth={postWidth} postHeight={postHeight}
                onScrollEnd={loadPhotos} />


            <PostList className={classNames(
                "grow",
                {
                    "hidden": tab != PostType.VIDEO
                }
            )} posts={videoResults?.posts} postWidth={postWidth} postHeight={postHeight}
                onScrollEnd={loadVideos} />
        </div>
    )
}