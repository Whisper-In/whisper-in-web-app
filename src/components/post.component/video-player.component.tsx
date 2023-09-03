"use client"

import { useIsInViewport } from "@/hooks/viewport.hook";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

export default function VideoPlayer({ className, src, poster }
    : { className?: string, src: string, poster?: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    const isInViewPort = useIsInViewport(ref);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (ref.current) {
            if (isInViewPort) {
                ref.current.play().catch(() => {});
            } else {
                ref.current.currentTime = 0;
                ref.current.pause();
            }
        }
    }, [isInViewPort]);

    const onClick = () => {
        if (ref.current?.paused || ref.current?.ended) {
            ref.current?.play();
        } else {
            ref.current?.pause();
        }
    }

    return (
        <div className={classNames(
            className,
            "relative"
        )} onClick={onClick}>
            {
                isInViewPort &&
                < FontAwesomeIcon className={classNames(
                    "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white transition-all",
                    {
                        "opacity-0 scale-0": isPlaying,
                        "opacity-70 scale-100": !isPlaying
                    }

                )}
                    icon={faPlay} fontSize={80} />
            }

            <video ref={ref}
                className="w-full h-full object-cover"
                loop={true}
                src={src}
                poster={poster}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)} />
        </div>
    );
}