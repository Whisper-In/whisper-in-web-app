"use client"

import { PostType } from "@/dtos/content/post.dtos"
import { Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useEffect, useState } from "react"
import classNames from "classnames"
import PostList from "./post-list.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons"
import { useGetPosts } from "@/store/hooks/content.hooks"
import { useSpinner } from "@/app/_components/spinner.component"

const POSTS_PER_LOAD = 12;

export default function PostTabs({ className, profileId }
    : { className?: string, profileId?: string }) {
    const [tab, setTab] = useState<PostType>(PostType.PHOTO);
    const { showSpinner } = useSpinner();


    const {
        data: photoPosts,
        size: photoPostsSize,
        setSize: setPhotoPostsSize,
        isLoading: isPhotoPostsLoading
    } = useGetPosts(profileId, PostType[PostType.PHOTO], POSTS_PER_LOAD);

    const {
        data: videoPosts,
        size: videoPostsSize,
        setSize: setVideoPostsSize,
        isLoading: isVideoPostsLoading
    } = useGetPosts(profileId, PostType[PostType.VIDEO], POSTS_PER_LOAD);

    const onTabChange = (event: SyntheticEvent<Element, Event>, value: PostType) => {
        setTab(value);
    }

    useEffect(() => {
        showSpinner(isPhotoPostsLoading || isVideoPostsLoading);

        const onScrollEnd = () => {            
            if (tab == PostType.PHOTO) {
                if (!isPhotoPostsLoading) {
                    setPhotoPostsSize(photoPostsSize + 1);
                }
            } else if (tab == PostType.VIDEO) {
                if (!isVideoPostsLoading) {
                    setVideoPostsSize(videoPostsSize + 1);
                }
            }
        }

        document.addEventListener("scrollend", onScrollEnd);

        return () => {
            document.removeEventListener("scrollend", onScrollEnd);
        }
    }, [isPhotoPostsLoading, isVideoPostsLoading, tab]);

    return (
        <div className={classNames(
            className,
            "flex flex-col"
        )}>
            <Tabs variant="fullWidth"
                sx={{
                    position: "sticky",
                    zIndex: 1,
                    top: 0
                }}
                value={tab} onChange={onTabChange}>
                <Tab icon={<FontAwesomeIcon icon={faImage} fontSize={20} />} value={PostType.PHOTO} />
                <Tab icon={<FontAwesomeIcon icon={faVideo} fontSize={20} />} value={PostType.VIDEO} />
            </Tabs>

            <PostList className={classNames(
                "grow",
                {
                    "hidden": tab != PostType.PHOTO
                }
            )} posts={photoPosts?.flat()}
                isLoading={isPhotoPostsLoading} />


            <PostList className={classNames(
                "grow",
                {
                    "hidden": tab != PostType.VIDEO
                }
            )} posts={videoPosts?.flat()}
                isLoading={isVideoPostsLoading} />
        </div>
    )
}