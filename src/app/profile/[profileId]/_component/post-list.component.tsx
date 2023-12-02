import { IPostDto, PostType } from "@/dtos/content/post.dtos";
import { isScrollEnded } from "@/utils/component.util";
import { Box, Stack, alpha } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

export default function PostList({
    className,
    posts,
    isLoading,
    isHidden
}: {
    className?: string,
    posts?: IPostDto[],
    isLoading?: boolean
    isHidden?: boolean
}) {

    if (isLoading) {
        return <></>
    }

    return (
        <Stack flexGrow={1} display={isHidden ? "none" : undefined}>
            {
                posts?.length ?
                    <div className="grid grid-cols-3 gap-[2px]">
                        {
                            posts.map((post, index) =>
                                <Link key={index}
                                    scroll={false}
                                    href={`/post/${post._id}`}
                                    className="flex align-center">
                                    <Box component="img"
                                        className="object-contain w-full"
                                        sx={{
                                            aspectRatio: 1 / 1.25,
                                            backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.05)
                                        }}
                                        src={post.thumbnailURL ?? post.postURL}
                                    />
                                </Link>
                            )
                        }
                    </div>
                    :
                    <Stack flexGrow={1} justifyContent="center" alignItems="center">
                        <span className="opacity-30">No Posts.</span>
                    </Stack>
            }
        </Stack>
    );
}