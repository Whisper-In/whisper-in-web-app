import Carousel from "@/app/_components/carousel.component";
import Post from "@/app/_components/post.component";
import { IPostDto } from "@/dtos/content/post.dtos";
import { Typography } from "@mui/material";
import classNames from "classnames";

export default function PostFeed({ className,
    posts,
    onScrollEnd,
    placeholder,
    isLoading
}: {
    className?: string,
    posts?: IPostDto[],
    onScrollEnd?: () => void,
    placeholder?: string,
    isLoading?: boolean
}) {
    if (posts?.length) {
        return (
            <Carousel className={classNames(className)}
                direction="y"
                onSrollEnd={onScrollEnd}>
                {
                    posts?.map((post, index) =>
                        <Post key={index} postId={post._id} />)
                }
            </Carousel>
        );
    }
    else {
        return (
            <div className={classNames(["flex w-full h-full justify-center items-center overflow-y-auto", className])}>
                <Typography color="GrayText"
                    textAlign="center"
                    px={10}>
                    {placeholder}
                </Typography>
            </div>
        );
    }

}