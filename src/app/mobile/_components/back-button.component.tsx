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

    return (
        <button className={classNames(
            "w-fit drop-shadow-md",
            className
        )} onClick={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} fontSize={25} />
        </button >
    );
}