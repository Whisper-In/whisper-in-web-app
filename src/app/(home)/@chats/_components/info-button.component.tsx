"use client"

import { useAlertPrompt } from "@/app/_components/alert-prompt.component";
import { InfoOutlined, Search } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

export default function InfoButton() {
    const { promptAlert } = useAlertPrompt();

    return (
        <IconButton onClick={() => {
            promptAlert({
                title: "Info",
                message: (
                    <Stack spacing={1}>
                        <p>Search for any user profiles in the <Search /> tab and subscribe to their profile to start chatting with their AI.</p>
                        <p>Only users with auto-reply turned on will have subscriptions and AI replies.</p>

                        <p>
                            <i>Disclaimer: These profiles were not created by the actual person. The profiles in this app are for demonstration purposes only.</i>
                        </p>
                    </Stack>)
            })
        }}>
            <InfoOutlined />
        </IconButton>
    )
}