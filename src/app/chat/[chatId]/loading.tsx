import Header from "@/app/_components/header.component";
import BackButton from "@/app/_components/back-button.component";
import { Skeleton } from "@mui/material";
import classNames from "classnames";
import ChatInputBar from "./_components/input-bar.component";

export default function Loading() {
    return (
        <main className="h-full w-full flex flex-col">
            <Header>
                <div className="flex gap-5 items-center">
                    <div className="flex grow items-center gap-5">
                        <BackButton />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width={100} />
                    </div>
                </div>
            </Header>

            <div className={classNames(
                "h-full w-full flex flex-col",
            )}>
                <div className="grow"></div>

                <ChatInputBar />
            </div>
        </main>
    );
}