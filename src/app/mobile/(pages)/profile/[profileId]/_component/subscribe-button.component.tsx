"use client"

import { IProfileDto } from "@/dtos/profile/profile.dtos";
import classNames from "classnames";

export default function SubscribeButton({ className, profile, disabled, onClick }
    : {
        className?: string, profile?: IProfileDto, disabled?: boolean, onClick?: () => void
    }) {

    const priceTier = profile?.priceTiers?.length ? profile?.priceTiers[0] : null;

    const _onClick = () => {
        if (!disabled && onClick) {
            onClick()
        }
    }

    return (
        <button disabled={disabled} onClick={_onClick} className={classNames(
            "rounded-full w-full px-5 py-3 text-white flex justify-center",
            {
                "bg-primary text-left": !profile?.isSubscribed,
                "bg-secondary text-center": profile?.isSubscribed
            },
            className
        )}>
            {
                !profile?.isSubscribed ?
                    <>
                        <div className="grow text-left">Subscribe</div>

                        <div className="font-bold">{(priceTier?.price ?? 0) > 0 ? `$${(priceTier!.price / 100).toFixed(2)}` : "FREE"}</div>
                    </>
                    :
                    <div>Subscribed</div>
            }
        </button>
    );
}