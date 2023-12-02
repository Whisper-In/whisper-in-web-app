import Header from "@/app/_components/header.component";
import BackButton from "@/app/_components/back-button.component";
import { Skeleton, Stack } from "@mui/material";
import classNames from "classnames";
import ChatInputBar from "./_components/input-bar.component";

export default function Loading() {
    return (
        <Stack flexGrow={1}>
            <Header>
                <div className="flex grow items-center gap-5">
                    <BackButton relative />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width={100} />
                </div>
            </Header>

            <div className={classNames(
                "h-full w-full flex flex-col",
            )}>
                <div className="grow"></div>

                <ChatInputBar />
            </div>
        </Stack>
    );
}