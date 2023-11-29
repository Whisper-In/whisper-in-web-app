import { IProfileDto, IProfileSearchDto } from "@/dtos/profile/profile.dtos";
import { Avatar, ListItem, ListItemButton } from "@mui/material";
import Link from "next/link";

export default function SearchListItem({ className, profile }
    : { className?: string, profile?: IProfileSearchDto }) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <Link href={`/profile/${profile?.id}`}
                    className="flex grow items-center gap-5 p-2">
                    <Avatar src={profile?.avatar} sx={{ width: 50, height: 50 }} />

                    <label>{profile?.name}</label>
                </Link>
            </ListItemButton>
        </ListItem>
    );
}