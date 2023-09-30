import Carousel from "@/components/carousel.component";
import Post from "@/components/post.component";
import { IPostDto } from "@/dtos/content/post.dtos";
import { Box, Typography } from "@mui/material";
import classNames from "classnames";

export default function PostFeed({ className, posts, onScrollEnd, placeholder }
    : { className?: string, posts: IPostDto[], onScrollEnd?: () => void, placeholder?: string }) {

    if (posts.length) {
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
    else {
        return (
            <div className={classNames(["flex w-full h-full justify-center items-center", className])}>
                <Typography color="GrayText">
                    {placeholder}
                </Typography>
            </div>
        );
    }

}