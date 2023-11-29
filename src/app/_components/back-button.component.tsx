"use client"

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function BackButton({ className }
    : { className?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onBack = () => {
        console.log(window.history.length)
        if(window.history.length) {
            router.back();
        } else {
            router.replace("/")
        }
    }

    return (
        <button className={classNames(
            "w-fit drop-shadow-md absolute top-14 left-5",
            className
        )} onClick={onBack}>
            <FontAwesomeIcon icon={faArrowLeft} fontSize={25} />
        </button >
    );
}