import { IProfileDto, IProfileSearchDto } from "@/server-dtos/profile/profile.server-dtos";
import Link from "next/link";

export default function SearchListItem({ className, profile }
    : { className?: string, profile?: IProfileSearchDto }) {
    return (
        <Link href={`/mobile/profile/${profile?.id}?isAI=true`} className="flex items-center gap-5 px-5 py-3 duration-500 transition active:bg-black/10">
            <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                <img className="w-full h-full bg-secondary object-cover object-top" src={profile?.avatar} />
            </div>

            <label>{profile?.name}</label>
        </Link>
    );
}