import { IPostDto } from "@/server-dtos/content/post.server-dtos";
import { faHeart, faPlus, faPlusCircle, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";

export default function ButtonGroup({ className, post, onLikeClick, onShareClick, hideAvatar }
    : {
        className?: string, post: IPostDto,
        onLikeClick?: () => void,        
        onShareClick?: () => void,
        hideAvatar?: boolean
    }) {
    return (
        <div className={classNames(
            "text-white shrink flex flex-col justify-center gap-3",
            className
        )}>
            {
                !hideAvatar &&
                <Link className="relative mb-5" href={`/profile/${post.creator._id}`}>
                    <Avatar src={post.creator.avatar}
                        sx={{ width: 70, height: 70, border: 4 }} />

                    {
                        !post.creator.isFollowing &&
                        <FontAwesomeIcon className="absolute rounded-full p-1 bg-primary bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
                            icon={faPlus} fontSize={15} />
                    }
                </Link>
            }

            <button onClick={onLikeClick}>
                <FontAwesomeIcon className={classNames({
                    "text-rose-600": post.isLiked
                })} icon={faHeart} fontSize={40} />

                <div className="italic text-sm">{post.likeCount}</div>
            </button>

            <button onClick={onShareClick}>
                <FontAwesomeIcon icon={faShare} fontSize={35} />

                <div className="italic text-sm">Share</div>
            </button>

        </div>
    );
}