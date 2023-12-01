"use client"

import { useIsInViewport } from "@/hooks/viewport.hook";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type VideoPlayerProps = {
    className?: string,
    src?: string,
    poster?: string
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ className, src, poster }: VideoPlayerProps, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInViewPort = useIsInViewport(videoRef);
    const [isPlaying, setIsPlaying] = useState(false);

    useImperativeHandle(ref, () => videoRef.current!, []);

    useEffect(() => {
        if (videoRef.current) {
            if (isInViewPort) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.currentTime = 0;
                videoRef.current.pause();
            }
        }
    }, [isInViewPort]);

    const onClick = () => {
        if (videoRef.current?.paused || videoRef.current?.ended) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
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

            <video ref={videoRef}
                controls={false}
                playsInline={true}
                className="h-full bject-contain"
                loop={true}
                src={src}
                poster={poster}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)} />
        </div>
    );
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;