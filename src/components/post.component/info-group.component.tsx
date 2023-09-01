import { IPostDto } from "@/server-dtos/content/post.server-dtos";
import classNames from "classnames";

export default function InfoGroup({ className, post }
    : { className?: string, post: IPostDto }) {
    return (
        <div className={classNames(
            "text-white flex flex-col gap-3",
            className)}>

            <label className="text-2xl italic">
                @{post.creator.userName}
            </label>

            <p>{post.description}</p>
        </div>
    );
}