"use client"

import Header from "@/app/mobile/_components/header.component";
import VideoPlayer from "@/components/post.component/video-player.component";
import { PostType } from "@/dtos/content/post.dtos";
import { Check, ChevronRight, Clear, Delete, Save } from "@mui/icons-material";
import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function PostEditor({ src, type, onCancel, onSave }
    : {
        src: string,
        type: PostType,
        onCancel?: () => void,
        onSave?: (description?: string) => void
    }) {
    const [description, setDescription] = useState<string | undefined>();
    const [openDrawer, setOpenDrawer] = useState(false);

    const DESCRIPTION_MAX_SIZE = 250;

    const handleSave = () => {
        if (onSave) {
            onSave(description);
        }
    }

    return (
        <>
            <Box sx={{
                width: "100%",
                height: "100%",
                position: "relative"
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    position: "absolute",
                    padding: 2,
                    zIndex: 1
                }}>
                    <Button sx={{ color: "white" }}
                        onClick={onCancel}>
                        <Clear fontSize="large" />
                    </Button>

                    <Button sx={{ color: "white" }}
                        onClick={() => setOpenDrawer(true)}>
                        <Check fontSize="large" />
                    </Button>
                </Box>
                {
                    type == PostType.PHOTO ?
                        <img className="w-full h-full object-cover"
                            src={src} />
                        :
                        <VideoPlayer className="w-full h-full" src={src} />
                }

                <div className="absolute w-full bottom-0 left-0 h-[200px] bg-gradient-to-t from-black/80 to-black/0s"></div>
            </Box>

            <Drawer open={openDrawer}
                title="Description"
                anchor="bottom"
                onClose={() => setOpenDrawer(false)}>
                <Box sx={{
                    padding: 2
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <Typography fontWeight={700}>
                            Add a Description (Optional)
                        </Typography>

                        <Button onClick={handleSave}>
                            Done
                        </Button>
                    </Box>

                    <TextField sx={{ width: "100%" }}
                        variant="standard"
                        inputProps={{
                            maxLength: DESCRIPTION_MAX_SIZE
                        }}
                        maxRows={10}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        multiline={true} />

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}>
                        {description?.length ?? 0}/{DESCRIPTION_MAX_SIZE}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}