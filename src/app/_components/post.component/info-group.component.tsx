"use client"

import { IPostDto } from "@/dtos/content/post.dtos";
import classNames from "classnames";
import { useState } from "react";

export default function InfoGroup({ className, post }
    : { className?: string, post: IPostDto }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div className={classNames(
            "text-white flex flex-col gap-3",
            className)}>

            <label className="text-2xl italic">
                @{post.creator.userName}
            </label>

            <p aria-label="description" className={classNames({
                "line-clamp-2": !showFullDescription,
                "line-clamp-6": showFullDescription
            })} onClick={() => setShowFullDescription(!showFullDescription)}>
                {post.description}
            </p>
        </div>
    );
}