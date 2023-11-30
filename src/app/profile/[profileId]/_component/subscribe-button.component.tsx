"use client"

import { IProfileDto } from "@/dtos/profile/profile.dtos";
import { Button, ButtonProps, Stack, Typography } from "@mui/material";
import classNames from "classnames";

export default function SubscribeButton({
    profile,
    disabled,
    onClick,
    ...props
}: {
    profile?: IProfileDto,
    disabled?: boolean,
    onClick?: () => void
} & ButtonProps) {

    const priceTier = profile?.priceTiers?.length ? profile?.priceTiers[0] : null;

    const _onClick = () => {
        if (!disabled && onClick) {
            onClick()
        }
    }

    return (
        <Button {...props}
            variant="outlined"
            disabled={disabled}
            onClick={_onClick}
            color={!profile?.isSubscribed ? "primary" : "secondary"}>
            {
                !profile?.isSubscribed ?
                    <Stack direction="row" spacing={2}>
                        <Typography>
                            Subscribe
                        </Typography>
                        <Typography fontWeight={700}>
                            ${(priceTier?.price || 0).toFixed(2)}
                        </Typography>
                    </Stack>
                    :
                    <Typography>
                        Subscribed
                    </Typography>
            }
        </Button>
    );
}