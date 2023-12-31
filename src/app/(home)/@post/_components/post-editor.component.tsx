"use client"

import VideoPlayer from "@/app/_components/post.component/video-player.component";
import { PostType } from "@/dtos/content/post.dtos";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

export const DESCRIPTION_MAX_SIZE = 250;

export default function PostEditor({ src, type, onCancel, onSave }
    : {
        src: string,
        type: PostType,
        onCancel?: () => void,
        onSave?: (description?: string) => void
    }) {
    const [description, setDescription] = useState<string | undefined>();
    const videoPlayerRef = useRef<HTMLVideoElement>(null);

    const handleSave = () => {
        if (onSave) {
            videoPlayerRef.current?.pause();
            onSave(description);
        }
    }

    return (
        <Stack aria-label="post-editor"
            alignItems="center" width="100%" height="100%">
            <Box flexGrow={1} overflow="hidden">
                {
                    type == PostType.PHOTO ?
                        <img className="w-full h-full object-contain"
                            src={src} alt="post-image" />
                        :
                        <VideoPlayer ref={videoPlayerRef} className="w-full h-full" src={src} />
                }
            </Box>

            <Paper component={Stack}
                width="100%"
                spacing={2}
                px={1} py={2}>
                <Typography fontWeight={700}>
                    Add a Description (Optional)
                </Typography>

                <TextField sx={{ width: "100%" }}
                    variant="standard"
                    inputProps={{
                        maxLength: DESCRIPTION_MAX_SIZE,
                        "aria-label": "description"
                    }}
                    maxRows={10}
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    multiline={true}
                    aria-multiline={true} />

                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}>
                    {description?.length ?? 0}/{DESCRIPTION_MAX_SIZE}
                </Box>

                <Stack direction="row" justifyContent="right" spacing={2}>
                    <Button sx={{ color: "white" }}
                        aria-label="cancel-button"
                        onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button aria-label="done-button"
                        onClick={handleSave}>
                        Done
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
}