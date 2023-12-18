"use client"

import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Clear } from "@mui/icons-material";
import { Box, Button, CircularProgress, Fab, IconButton } from "@mui/material";
import { ChangeEvent, ReactEventHandler, useEffect, useRef, useState } from "react";
import { ToastDuration, useToast } from "@/app/_components/toast.component";
import { TextInputProps } from ".";
import { Validator } from "@/utils/form.util";
import { useAlertPrompt } from "@/app/_components/alert-prompt.component";

export default function AudioInput(props: TextInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioURL, setAudioURL] = useState(props.value);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState("0.00/0.00");
    const [error, setError] = useState<string | undefined>();
    const { showToast } = useToast();
    const { promptAlert } = useAlertPrompt();
    const size = 100;


    const handleAudioUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            const audioFile = e.currentTarget.files.item(0);

            const blob = new Blob([audioFile!]);

            const url = URL.createObjectURL(blob);

            setAudioURL(url);
            reset();
        }
    }

    const clearAudio = () => {
        setAudioURL("");
        setError(undefined);

        if (props.onChange) {
            props.onChange(undefined);
        }

        reset();
    }

    const reset = () => {
        setProgress(0);
        setIsPlaying(false);
    }

    const onStop = () => {
        setIsPlaying(false);
    }

    const onPlay = () => {
        if (props.value) {
            if (!isPlaying) {
                audioRef.current?.play();
            } else {
                audioRef.current?.pause();
            }
        } else {
            showToast({
                message: "Upload an audio file to play.",
                duration: ToastDuration.SHORT
            });
        }
    }

    const onTimeUpdate: ReactEventHandler<HTMLAudioElement> = (e) => {
        const duration = e.currentTarget.duration;
        const time = e.currentTarget.currentTime;

        const progress = time / duration * 100;

        setProgress(progress);
        updateTimeString();
    }

    const validateAudioFile = () => {
        setError(undefined);
        if (!audioURL || audioURL == props.value) {
            setError("");
            return;
        }

        if (props.validations) {
            const error = Validator(audioRef.current?.duration.toString(), props.validations);

            if (error) {
                promptAlert({
                    title: "Upload Audio File Failed",
                    message: error
                });

                setAudioURL(props.value);

                setError(error);
            } else {
                if (props.onChange) {
                    props.onChange(audioURL);
                }
            }
        }
    }

    const updateTimeString = () => {
        const time = (audioRef.current?.currentTime ?? 0) / 60;
        let duration = (audioRef.current?.duration ?? 0) / 60;

        if (isNaN(duration)) {
            duration = 0;
        }

        setTime(`${time.toFixed(2)}/${duration.toFixed(2)}`);
    }

    const onCanPlay = () => {
        updateTimeString();

        validateAudioFile();
    }

    useEffect(() => {
        validateAudioFile();
    }, []);

    useEffect(() => {
        if (props.onError) {
            props.onError(error);
        }
    }, [error]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            p: 2,
        }}>
            <Box sx={{
                position: "relative",
                width: size,
                height: size
            }} component="div">
                <Fab sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: size - 16,
                    height: size - 16,
                    transform: "translateX(-50%) translateY(-50%)"
                }} onClick={onPlay}>
                    {
                        !isPlaying ?
                            <PlayIcon fontSize="large" />
                            :
                            <PauseIcon fontSize="large" />
                    }
                </Fab>

                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={size} />
            </Box>

            <Box>
                {time}
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "row"
            }}>
                <Button variant="outlined" onClick={() => inputRef.current?.click()}>
                    {!props.value ? 'Upload audio' : 'Change audio'}
                </Button>

                <IconButton onClick={clearAudio}>
                    <Clear fontSize="large" />
                </IconButton>
            </Box>

            <audio ref={audioRef}
                src={audioURL}
                hidden={true}
                onCanPlay={onCanPlay}
                onPlay={() => setIsPlaying(true)}
                onPause={onStop}
                onEnded={onStop}
                onTimeUpdate={onTimeUpdate}
            />

            <input ref={inputRef}
                type="file"
                hidden={true}
                onChange={handleAudioUpload}
                accept="audio/*"
            />
        </Box>
    );
}