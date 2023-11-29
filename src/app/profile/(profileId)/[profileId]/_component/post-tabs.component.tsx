"use client"

import { PostType } from "@/dtos/content/post.dtos"
import { Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useEffect, useState } from "react"
import * as postService from "@/store/services/content/post.service"
import classNames from "classnames"
import PostList from "./post-list.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faPhotoFilm, faVideo } from "@fortawesome/free-solid-svg-icons"
import { useGetPosts } from "@/store/hooks/content.hooks"

export default function PostTabs({ className, profileId }
    : { className?: string, profileId?: string }) {
    const [tab, setTab] = useState<PostType>(PostType.PHOTO);
    const postsPerLoad = 12;
    const {
        data: photoPosts,
        size: photoPostsSize,
        setSize: setPhotoPostsSize,
        isLoading: isPhotoPostsLoading
    } = useGetPosts(profileId!, PostType[PostType.PHOTO], postsPerLoad);

    const {
        data: videoPosts,
        size: videoPostsSize,
        setSize: setVideoPostsSize,
        isLoading: isVideoPostsLoading
    } = useGetPosts(profileId!, PostType[PostType.PHOTO], postsPerLoad);

    const onTabChange = (event: SyntheticEvent<Element, Event>, value: PostType) => {
        setTab(value);
    }

    const onPhotoTabScrollEnd = () => {
        if (tab == PostType.PHOTO) {
            if (!isPhotoPostsLoading) {
                setPhotoPostsSize(photoPostsSize + 1);
            }
        }
    }

    const onVideoTabScrollEnd = () => {
        if (tab == PostType.VIDEO) {
            if (!isVideoPostsLoading) {
                setVideoPostsSize(videoPostsSize + 1);
            }
        }
    }

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
            )} posts={photoPosts?.flat()}
                onScrollEnd={onPhotoTabScrollEnd} />


            <PostList className={classNames(
                "grow",
                {
                    "hidden": tab != PostType.VIDEO
                }
            )} posts={videoPosts?.flat()}
                onScrollEnd={onVideoTabScrollEnd} />
        </div>
    )
}