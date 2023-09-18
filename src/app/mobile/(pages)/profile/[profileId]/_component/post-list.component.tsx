import { IPostDto, PostType } from "@/dtos/content/post.dtos";
import { isScrollEnded } from "@/utils/component.util";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

export default function PostList({ className, posts, postWidth, postHeight, onScrollEnd }
    : { className?: string, posts?: IPostDto[], postWidth: number, postHeight: number, onScrollEnd?: () => void }) {

    const onScroll = (event: React.UIEvent) => {
        if (onScrollEnd) {
            if (isScrollEnded(event)) {
                onScrollEnd();
            }
        }
    }

    return (
        <div className={classNames(
            "relative flex justify-center items-center",
            className
        )}>
            {
                posts?.length ?
                    <div className="absolute top-0 left-0 bottom-0 right-0 overflow-y-auto" onScroll={onScroll}>
                        <div className="grid grid-cols-3 gap-[2px]">
                            {
                                posts.map((post, index) =>
                                    <Link key={index} href={`/mobile/post/${post._id}`}>
                                        <img className="object-cover w-full" style={{ height: postHeight }}
                                            src={post.thumbnailURL ?? post.postURL}
                                        />
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                    :
                    <span className="text-onSurface">No Posts.</span>
            }
        </div>
    );
}