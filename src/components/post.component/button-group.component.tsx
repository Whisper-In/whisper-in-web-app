import { IPostDto } from "@/server-dtos/content/post.server-dtos";
import { faHeart, faPlus, faPlusCircle, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default function ButtonGroup({ className, post, onLikeClick, onProfileClick, onShareClick, hideAvatar }
    : {
        className?: string, post: IPostDto,
        onLikeClick?: () => void,
        onProfileClick?: (profileId: string) => void,
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
                <button className="relative mb-5" onClick={() => onProfileClick && onProfileClick(post.creator._id)}>
                    {
                        !post.creator.isFollowing &&
                        <FontAwesomeIcon className="absolute rounded-full p-1 bg-primary bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
                            icon={faPlus} fontSize={15} />
                    }
                    <div className="rounded-full overflow-hidden border border-white border-4 w-[70px] h-[70px]">
                        <img className="object-top object-cover" src={post.creator.avatar} />
                    </div>
                </button>
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