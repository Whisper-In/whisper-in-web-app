"use client"

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function BackButton({ relative }
    : { relative?: boolean }) {
    const router = useRouter();    

    const onBack = () => {        
        if (window.history.length) {
            router.back();
        } else {
            router.replace("/")
        }
    }

    return (
        <button className={classNames(
            "w-fit drop-shadow",
            {
                "absolute top-14 left-5": !relative
            }
        )} onClick={onBack}>
            <FontAwesomeIcon icon={faArrowLeft} fontSize={25} />
        </button >
    );
}