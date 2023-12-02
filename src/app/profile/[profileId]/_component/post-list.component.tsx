import { IPostDto, PostType } from "@/dtos/content/post.dtos";
import { isScrollEnded } from "@/utils/component.util";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
export default function PostList({
    className,
    posts,
    isLoading
}: {
    className?: string,
    posts?: IPostDto[],
    isLoading?: boolean
}) {

    if (isLoading) {
        return <></>
    }

    return (
        <div className={classNames(
            "flex justify-center items-center",
            className
        )}>
            {
                posts?.length ?
                    <div className="grid grid-cols-3 gap-[2px]">
                        {
                            posts.map((post, index) =>
                                <Link key={index}
                                    scroll={false}
                                    href={`/post/${post._id}`}
                                    className="flex align-center">
                                    <img className="object-cover w-full"
                                        style={{
                                            aspectRatio: 1 / 1.25
                                        }}
                                        src={post.thumbnailURL ?? post.postURL}
                                    />
                                </Link>
                            )
                        }
                    </div>
                    :
                    <span className="opacity-30">No Posts.</span>
            }
        </div>
    );
}