"use client"

import { IProfileDto } from "@/dtos/profile/profile.dtos";
import { Button, ButtonProps, Stack, Typography } from "@mui/material";
import classNames from "classnames";

export default function FollowButton({
    profile,
    disabled,
    onClick,
    ...props
}: {
    profile?: IProfileDto,
    disabled?: boolean,
    onClick?: () => void
} & ButtonProps) {
    const _onClick = () => {
        if (!disabled && onClick) {
            onClick()
        }
    }

    return (
        <Button {...props}
            aria-label="follow-button"
            variant="contained"
            disabled={disabled}
            onClick={_onClick}
            color={!profile?.isFollowing ? "primary" : "secondary"}>
            {
                !profile?.isFollowing ? "Follow" : "Following"
            }
        </Button>
    );
}