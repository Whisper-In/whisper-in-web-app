import { IPostDto } from "@/dtos/content/post.dtos";
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