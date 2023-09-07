"use client"

import { IconLookup, IconName } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation({ className, links, hideLabels }
    : {
        className?: string,
        links: { label?: string, icon: IconLookup, href: string }[],
        hideLabels?: boolean
    }) {
    let pathName = usePathname();
    pathName = pathName.replace("/mobile", "");

    if (!pathName.length) {
        pathName = "/";
    }

    links.forEach((link) => {
        if (link.href[0] != "/") {
            link.href = `/${link.href}`;
        }
    });

    return (
        <nav className={classNames(
            className,
            "flex w-screen shadow-[rgba(0,0,0,0.2)_0px_0px_15px] bg-surface"
        )}>
            {
                links.map((link, idx) => (
                    <Link key={idx} href={link.href} className="grow basis-1 flex flex-col justify-center items-center pb-2 pt-4 px-2">
                        <FontAwesomeIcon
                            icon={link.icon}
                            className={classNames(
                                "mb-2",
                                {
                                    "text-onSurface/50": pathName != link.href,
                                    "text-onSurface": pathName == link.href
                                }
                            )}
                            fontSize={20} />

                        {
                            !hideLabels && link.label &&
                            <label className="text-xs line-clamp-1">{link.label}</label>
                        }
                    </Link>
                ))
            }
        </nav>
    );
}