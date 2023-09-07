import Carousel from "@/components/carousel.component";
import Post from "@/components/post.component";
import { IPostDto } from "@/server-dtos/content/post.server-dtos";
import classNames from "classnames";

export default function PostFeed({ className, posts, onScrollEnd }
    : { className?: string, posts: IPostDto[], onScrollEnd?: () => void }) {
    return (
        <Carousel className={classNames(className)}
            direction="y" onSrollEnd={onScrollEnd}>
            {
                posts.map((post, index) =>
                    <Post key={index} post={post} />)
            }
        </Carousel>
    );
}