"use client"

import classNames from "classnames";

export default function SubscribeButton({ className, isSubscribed, price }
    : { className?: string, isSubscribed?: boolean, price: number }) {
    const onClick = () => {
        alert('Subscribe!')
    }

    return (
        <button onClick={onClick} className={classNames(
            "rounded-full w-full px-5 py-3 text-white flex justify-center",
            {
                "bg-primary text-left": !isSubscribed,
                "bg-secondary text-center": isSubscribed
            },
            className
        )}>
            {
                !isSubscribed ?
                    <>
                        <div className="grow text-left">Subscribe</div>

                        <div className="font-bold">{price > 0 ? `$${price}` : "FREE"}</div>
                    </>
                    :
                    <div>Subscribed</div>
            }
        </button>
    );
}