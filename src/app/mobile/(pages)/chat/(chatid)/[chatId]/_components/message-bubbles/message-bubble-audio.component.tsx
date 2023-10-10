import classNames from "classnames";
import { MessageBubbleWrapper } from "./message-bubble-wrapper.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material";
import { useSpringValue } from "@react-spring/web";
import { convertToMessageTime } from "@/utils/datetime.util";
import { useLiveQuery } from "dexie-react-hooks";
import { idb } from "@/store/indexedDB";
import { ChatMessage } from "@/store/states/chats.states";

const WAVEFORM_BARS = 65;
const WAVEFORM_WIDTH = 200;
const WAVEFORM_HEIGHT = 50;
const WAVEFORM_GAP = 1;
const WAVEFORM_AMPLIFICATION = 2;
const MAX_PROGRESS = 100;

export function MessageBubbleAudio({ className, message, chatId, isUser }
    : { className?: string, message: ChatMessage, chatId: string, isUser?: boolean }) {
    const theme = useTheme();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [audioURL, setAudioURL] = useState<string | undefined>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioTime, setAudioTime] = useState(0);
    const [channelData, setChannelData] = useState<number[]>(Array(WAVEFORM_BARS).fill(0));
    const audioSeekerValue = useSpringValue(0);

    const messageTime = convertToMessageTime(message.updatedAt!);

    const audio = useLiveQuery(async () =>
        await idb.audios
            .where(['chatId', 'id'])
            .equals([chatId, message.messageId!])
            .first(),
        [message.messageId]
    );

    const audioContext = new AudioContext();

    const getWaveformChannelData = async (arrayBuffer: ArrayBuffer) => {
        try {
            const buffer = await audioContext.decodeAudioData(arrayBuffer);

            const rawChannelData = buffer.getChannelData(0);
            const channelData: number[] = [];

            const channelSkipCount = Math.round((rawChannelData.length - 1) / WAVEFORM_BARS);

            for (let i = 0; i < WAVEFORM_BARS; i++) {
                const idx = i * channelSkipCount
                const total = rawChannelData.slice(idx, idx + channelSkipCount)
                    .reduce((prev, curr) => prev + Math.abs(curr), 0);

                channelData.push(total / channelSkipCount);
            }

            setChannelData(channelData);
        } catch (error) {
            throw error;
        }
    }

    const drawWaveform = async () => {
        if (!audioContext) {
            return;
        }

        const context = canvasRef.current!.getContext("2d")!;

        context.restore();
        context.clearRect(0, 0, WAVEFORM_WIDTH, WAVEFORM_HEIGHT);

        context.save();

        //Draw wave strokes
        context.translate(0, WAVEFORM_HEIGHT / 2);

        const barWidth = WAVEFORM_WIDTH / WAVEFORM_BARS - WAVEFORM_GAP;

        context.beginPath();
        for (let i = 0; i < WAVEFORM_BARS; i++) {
            const x = i * (barWidth + WAVEFORM_GAP);
            const height = Math.max(Math.abs(channelData[i]) * WAVEFORM_HEIGHT * WAVEFORM_AMPLIFICATION * 2, 1);
            context.rect(x, -height / 2, barWidth, height)
        }
        context.clip();

        context.fillStyle = theme.palette.container.contrastText;
        context.translate(0, -WAVEFORM_HEIGHT / 2);
        context.fillRect(0, 0, WAVEFORM_WIDTH, WAVEFORM_HEIGHT);
    }

    const resetAudioSeeker = () => {
        const context = canvasRef.current!.getContext("2d")!;

        context.fillStyle = "#aaa";
        context.fillRect(0, 0, WAVEFORM_WIDTH, WAVEFORM_HEIGHT);
    }


    const updateAudioSeeker = () => {
        const context = canvasRef.current!.getContext("2d")!;

        const progress = audioSeekerValue.get() / MAX_PROGRESS;

        context.fillStyle = "#FFF";
        context.fillRect(0, 0, WAVEFORM_WIDTH * progress, WAVEFORM_HEIGHT);
    }

    useEffect(() => {
        if (audio) {
            const blob = new Blob([audio.arrayBuffer!], { type: "audio/mpeg" });
            const url = URL.createObjectURL(blob);

            setAudioURL(url);

            getWaveformChannelData(audio.arrayBuffer);
        }
    }, [audio]);

    useEffect(() => {
        if (audioContext && canvasRef.current) {
            drawWaveform();
        }
    }, [channelData]);


    const toggleAudio = async () => {
        if (!audio) {
            return;
        }

        if (audioRef.current) {
            if (!isPlaying) {
                resetAudioSeeker();
                drawWaveform();

                audioRef.current.currentTime = 0;

                audioSeekerValue.start({
                    from: 0,
                    to: MAX_PROGRESS,
                    config: {
                        duration: audioRef.current.duration * 1000
                    },
                    onChange: updateAudioSeeker
                });

                await audioRef.current.play()
            } else {
                audioSeekerValue.stop();
                await audioRef.current.pause();
            }
        }
    }

    const onTimeUpdate = () => {
        _setAudioTime(audioRef.current?.currentTime);
    }

    const onPlay = () => {
        setIsPlaying(true);
    }

    const onPause = () => {
        setIsPlaying(false);
    }

    const onStop = () => {
        setIsPlaying(false);
        _setAudioTime(audioRef.current?.duration);
    }

    const onLoadedData = () => {
        _setAudioTime(audioRef.current?.duration);
    }

    const _setAudioTime = (time?: number) => {
        if (!time || isNaN(time)) {
            time = 0;
        }

        setAudioTime(time / 60);
    }

    return (
        <MessageBubbleWrapper className={classNames(
            className
        )} isPrimary={isUser}>
            <div className="flex gap-5 p-2 items-center">
                <button onClick={toggleAudio}>
                    <FontAwesomeIcon icon={!isPlaying ? faPlayCircle : faStopCircle} fontSize={35} />
                </button>

                <div>
                    <canvas ref={canvasRef} width={WAVEFORM_WIDTH} height={WAVEFORM_HEIGHT}></canvas>

                    <div className="flex text-xs items-center">
                        <span className="grow">
                            {audioTime.toFixed(2)}
                        </span>

                        <span>
                            {messageTime}
                        </span>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} src={audioURL}
                onTimeUpdate={onTimeUpdate}
                onPlay={onPlay}
                onPause={onPause}
                onEnded={onStop}
                onLoadedData={onLoadedData}
            />
        </MessageBubbleWrapper>
    );
}
