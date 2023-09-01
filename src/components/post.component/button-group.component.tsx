import { IPostDto } from "@/server-dtos/content/post.server-dtos";
import { faHeart, faPlus, faPlusCircle, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default function ButtonGroup({ className, post, onLikeClick }
    : { className?: string, post: IPostDto, onLikeClick?: () => void }) {
    return (
        <div className={classNames(
            "text-white shrink flex flex-col justify-center gap-3",
            className
        )}>
            <button className="relative mb-5">
                {
                    !post.creator.isFollowing &&
                    <FontAwesomeIcon className="absolute rounded-full p-1 bg-primary bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
                        icon={faPlus} fontSize={15} />
                }
                <div className="rounded-full overflow-hidden border border-white border-4 w-[70px] h-[70px]">
                    <img className="object-top object-cover" src={post.creator.avatar} />
                </div>
            </button>

            <button onClick={onLikeClick}>
                <FontAwesomeIcon className={classNames({
                    "text-rose-600": post.isLiked
                })} icon={faHeart} fontSize={40} />

                <div className="italic text-sm">{post.likeCount}</div>
            </button>

            <button>
                <FontAwesomeIcon icon={faShare} fontSize={35} />

                <div className="italic text-sm">Share</div>
            </button>

        </div>
    );
}