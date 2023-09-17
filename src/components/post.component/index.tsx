"use client"

import { useIsInViewport } from "@/hooks/viewport.hook";
import classNames from "classnames"
import { useRef, useEffect, useState, useContext } from "react"
import InfoGroup from "./info-group.component";
import ButtonGroup from "./button-group.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import LikePrompt, { LikePromptType } from "./like-prompt.component";
import { IPostDto, PostType } from "@/dtos/content/post.dtos";
import * as postService from "@/app/_client-services/content/post.service";
import VideoPlayer from "./video-player.component";
import { usePathname, useRouter } from "next/navigation";
import { ShareModalContext, useShareModal } from "@/app/mobile/_components/share-modal.component";

export default function Post({ className, post, hideAvatar }
    : { className?: string, post: IPostDto, hideAvatar?: boolean }) {
    const [_post, setPost] = useState<IPostDto>(post);
    const likePromptRef = useRef<LikePromptType>(null);
    const [clickCount, setClickCount] = useState(0);
    const [showLike, setShowLike] = useState(false);
    const { setShowShareModal } = useShareModal();
    const router = useRouter();

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

    const onProfileClick = (profileId: string) => {
        router.push(`/mobile/profile/${profileId}`);
    }

    const onShareClick = () => {
        setShowShareModal(true, `${origin}/mobile/post/${post._id}?showAvatar=true`);
    }

    return (
        <div className="w-full h-full relative">
            <div className="absolute top-0 left-0 w-full h-full" onClick={onClick}>
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

            <div className="absolute w-full bottom-0 left-0 h-[200px] bg-gradient-to-t from-black/80 to-black/0s"></div>

            <LikePrompt ref={likePromptRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />

            <div className="absolute w-full left-0 bottom-0 px-3 pb-4 flex items-end">
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