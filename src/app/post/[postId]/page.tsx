"use client"

import Post from "@/app/_components/post.component";
import BackButton from "@/app/_components/back-button.component";
import { ScopedCssBaseline, Stack, ThemeProvider } from "@mui/material";
import { darkTheme } from "@/app/themes";

export default function PostPage({ params, searchParams }
    : { params: { postId: string }, searchParams: { [key: string]: string | string[] } }) {
    const showAvatar = searchParams["showAvatar"] == "true";

    return (
        <ThemeProvider theme={darkTheme}>
            <ScopedCssBaseline component={Stack} flexGrow={1}>
                <Post postId={params.postId} hideAvatar={!showAvatar} />

                <BackButton />
            </ScopedCssBaseline>
        </ThemeProvider>
    );
}