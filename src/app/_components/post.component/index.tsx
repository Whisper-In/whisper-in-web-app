"use client"

import classNames from "classnames"
import { useRef, useEffect, useState, useContext } from "react"
import InfoGroup from "./info-group.component";
import ButtonGroup from "./button-group.component";
import LikePrompt, { LikePromptType } from "./like-prompt.component";
import { IPostDto, PostType } from "@/dtos/content/post.dtos";
import * as postService from "@/store/services/content/post.service";
import VideoPlayer from "./video-player.component";
import { useRouter } from "next/navigation";
import { useShareModal } from "@/app/_components/share-modal.component";
import { Delete } from "@mui/icons-material";
import { useAppSelector } from "@/store/hooks";
import { useSpinner } from "../spinner.component";
import { useAlertPrompt } from "../alert-prompt.component";

export default function Post({ className, post, hideAvatar }
    : { className?: string, post: IPostDto, hideAvatar?: boolean }) {
    const [_post, setPost] = useState<IPostDto>(post);
    const likePromptRef = useRef<LikePromptType>(null);
    const [clickCount, setClickCount] = useState(0);
    const [showLike, setShowLike] = useState(false);
    const { setShowShareModal } = useShareModal();
    const router = useRouter();
    const me = useAppSelector((state) => state.user.me);
    const { showSpinner } = useSpinner();
    const { promptAlert } = useAlertPrompt();

    const clickInterval = 250;
    let clickTimeout: NodeJS.Timeout;

    const likePost = () => {
        likePromptRef.current?.prompt();

        if (!_post.isLiked) {
            _post.isLiked = true;
            _post.likeCount += 1;
            setPost({ ..._post });

            postService.likePost(post._id);
        }
    }

    const onLikeClick = () => {
        _post.isLiked = !_post.isLiked;
        _post.likeCount += _post.isLiked ? 1 : -1;

        setPost({ ..._post });

        if (_post.isLiked) {
            likePromptRef.current?.prompt();
        }

        postService.likePost(_post._id);
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
        setShowShareModal(true, `${origin}/mobile/post/${post._id}?showAvatar=true`);
    }

    const deletePost = () => {
        showSpinner(true);
        const failPrompt = () => {
            promptAlert({
                title: "Delete Post Failed",
                message: "Failed to delete post. Please try again."
            });
        }

        postService.deletePost(post._id)
            .then((result) => {
                if (result?.deletedCount > 0) {
                    promptAlert({
                        title: "Post Deleted",
                        message: "Post successfully delete.",
                        onOk: () => router.back()
                    });
                } else {
                    failPrompt();
                }
            })
            .catch(() => {
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

    return (
        <div className="w-full h-full relative">
            <div className="w-full h-full" onClick={onClick}>
                {
                    _post.postType == PostType[PostType.PHOTO] ?
                        <img className={classNames(
                            "w-full h-full object-cover",
                            className
                        )}
                            src={_post.postURL} />
                        :
                        <VideoPlayer className="w-full h-full object-cover"
                            src={_post.postURL}
                            poster={_post.thumbnailURL} />
                }
            </div>

            {
                me?._id == post.creator._id &&
                <button className="absolute top-5 pt-sat right-5" onClick={onDelete}>
                    <Delete fontSize="large" />
                </button>
            }

            <div className="absolute w-full bottom-0 left-0 h-[200px] bg-gradient-to-t from-black/80 to-black/0s"></div>

            <LikePrompt ref={likePromptRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />

            <div className="absolute w-full left-0 bottom-1 px-4 pb-8 flex items-end">
                <InfoGroup post={_post} className="grow" />
                <ButtonGroup post={_post}
                    onLikeClick={onLikeClick}
                    onShareClick={onShareClick}
                    hideAvatar={hideAvatar}
                />
            </div>
        </div>
    )
}