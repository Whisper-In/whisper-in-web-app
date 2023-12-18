"use client"

import classNames from "classnames"
import { useRef, useEffect, useState } from "react"
import InfoGroup from "./info-group.component";
import ButtonGroup from "./button-group.component";
import LikePrompt, { LikePromptType } from "./like-prompt.component";
import { PostType } from "@/dtos/content/post.dtos";
import * as postService from "@/store/services/content/post.service";
import VideoPlayer from "./video-player.component";
import { useRouter } from "next/navigation";
import { useShareModal } from "@/app/_components/share-modal.component";
import { Delete } from "@mui/icons-material";
import { useSpinner } from "../spinner.component";
import { useAlertPrompt } from "../alert-prompt.component";
import { useGetPostDetails } from "@/store/hooks/content.hooks";
import { CircularProgress, Stack, Typography } from "@mui/material";

export default function Post({
    className,
    postId,
    hideAvatar
}: {
    className?: string,
    postId: string,
    hideAvatar?: boolean
}) {
    const { data: post, isLoading, mutate: updatePost } = useGetPostDetails(postId);

    const likePromptRef = useRef<LikePromptType>(null);
    const videoPlayerRef = useRef<HTMLVideoElement>(null);
    const [clickCount, setClickCount] = useState(0);
    const { setShowShareModal } = useShareModal();
    const router = useRouter();
    const { showSpinner } = useSpinner();
    const { promptAlert } = useAlertPrompt();

    const clickInterval = 250;
    let clickTimeout: NodeJS.Timeout;

    const likePost = () => {
        likePromptRef.current?.prompt();

        if (!post?.isLiked) {
            postService.likePost(postId).then(() => {
                updatePost();
            });
        }
    }

    const onLikeClick = () => {
        postService.likePost(postId).then((result) => {
            if (result.isLiked) {
                likePromptRef.current?.prompt();
            }

            updatePost();
        });
    }

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => setClickCount(0), clickInterval);

        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);

        switch (newClickCount) {
            case 1:
                break;
            case 2:
                likePost();
                break;
        }
    }

    const onShareClick = () => {
        setShowShareModal(true, `${origin}/post/${postId}?showAvatar=true`);
    }

    const deletePost = () => {
        showSpinner(true);

        const failPrompt = () => {
            promptAlert({
                title: "Delete Post Failed",
                message: "Failed to delete post. Please try again."
            });
        }

        if(post?.postType == PostType[PostType.VIDEO]) {
            videoPlayerRef.current?.pause();
        }

        postService.deletePost(postId)
            .then((result) => {
                if (result?._id == postId) {
                    promptAlert({
                        title: "Post Deleted",
                        message: "Post successfully delete.",
                        onOk: () => router.back()
                    });
                } else {
                    failPrompt();
                }
            })
            .catch((err) => {                
                failPrompt();
            })
            .finally(() => {
                showSpinner(false);
            });
    }

    const onDelete = () => {
        promptAlert({
            title: "Delete Post?",
            message: "Are you sure you want to delete this post?",
            onOk: deletePost,
            okText: "Yes",
            cancelText: "No",
            showCancel: true
        })
    }

    if (isLoading) {
        return (
            <Stack flexGrow={1}
                height="100%"
                justifyContent="center"
                alignItems="center">
                <CircularProgress
                    aria-busy={true}
                    aria-describedby="loading-post" />
            </Stack>
        )
    }

    if (!post) {
        return (
            <Stack flexGrow={1}
                height="100%"
                justifyContent="center"
                alignItems="center">
                <Typography>
                    Unable to load post.
                </Typography>
            </Stack>
        )
    }

    return (
        <Stack flexGrow={1}
            height="100%"
            maxHeight="100vh"
            overflow="hidden"
            position="relative"
            justifyContent="center">
            <div aria-label="post-container"
                className="w-full h-full"
                onClick={onClick}>
                {
                    post.postType == PostType[PostType.PHOTO] ?
                        <img aria-label="post-image" className={classNames(
                            "w-full h-full max-h-screen object-contain object-center"
                        )}
                            src={post.postURL} />
                        :
                        <VideoPlayer ref={videoPlayerRef} className="w-full h-full max-h-screen object-contain object-center"
                            src={post.postURL}
                            poster={post?.thumbnailURL} />
                }
            </div>

            {
                post.isCreator &&
                <button className="absolute top-14 pt-sat right-5 drop-shadow" onClick={onDelete}>
                    <Delete fontSize="large" />
                </button>
            }

            <div className="pointer-events-none absolute w-full bottom-0 left-0 h-[350px] bg-gradient-to-t from-black/80 to-black/0s"></div>

            <LikePrompt ref={likePromptRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />

            <div className="absolute w-full left-0 bottom-1 px-4 pb-8 flex items-end">
                <InfoGroup post={post} className="grow" />
                <ButtonGroup post={post}
                    onLikeClick={onLikeClick}
                    onShareClick={onShareClick}
                    hideAvatar={hideAvatar}
                />
            </div>
        </Stack>
    )
}