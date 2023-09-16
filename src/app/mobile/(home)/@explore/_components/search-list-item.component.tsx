import { IProfileDto, IProfileSearchDto } from "@/server-dtos/profile/profile.server-dtos";
import { Avatar, ListItem, ListItemButton } from "@mui/material";
import Link from "next/link";

export default function SearchListItem({ className, profile }
    : { className?: string, profile?: IProfileSearchDto }) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <Link href={`/mobile/profile/${profile?.id}?isAI=true`}
                    className="flex items-center gap-5 p-2">
                    <Avatar src={profile?.avatar} sx={{ width: 50, height: 50 }} />

                    <label>{profile?.name}</label>
                </Link>
            </ListItemButton>
        </ListItem>
    );
}