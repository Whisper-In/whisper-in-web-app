import Carousel from "@/app/_components/carousel.component";
import Post from "@/app/_components/post.component";
import { IPostDto } from "@/dtos/content/post.dtos";
import { CircularProgress, Stack, Typography } from "@mui/material";
import classNames from "classnames";

export default function PostFeed({
    isHidden,
    posts,
    onScrollEnd,
    placeholder,
    isLoading,
    isValidating
}: {
    isHidden?: boolean
    posts?: IPostDto[],
    onScrollEnd?: () => void,
    placeholder?: string,
    isLoading?: boolean
    isValidating?: boolean
}) {
    if (isLoading) {
        return null;
    }

    if (posts?.length) {
        return (
            <Stack flexGrow={1}
                position="relative"
                spacing={2}
                height="100%"
                display={isHidden ? "none" : undefined}>
                <Carousel
                    direction="y"
                    onSrollEnd={onScrollEnd}>
                    {
                        posts?.map((post, index) =>
                            <Post key={index} postId={post._id} />)
                    }
                </Carousel>

                {
                    isValidating &&
                    < CircularProgress sx={{
                        position: "absolute",
                        bottom: 3,
                        left: "50%",
                        transform: "translateX(-50%)"
                    }}
                size={30} />
                }
            </Stack>
        );
    }
    else {
        return (
            <div className={classNames(["flex w-full h-full justify-center items-center overflow-y-auto"])}
                style={{ display: isHidden ? "none" : undefined }}>
                <Typography color="GrayText"
                    textAlign="center"
                    px={10}>
                    {placeholder}
                </Typography>
            </div>
        );
    }

}