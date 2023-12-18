import { IProfileDto, IProfileSearchDto } from "@/dtos/profile/profile.dtos";
import { Avatar, ListItem, ListItemButton } from "@mui/material";
import Link from "next/link";

export default function SearchListItem({ className, profile }
    : { className?: string, profile?: IProfileSearchDto }) {
    return (
        <ListItem disablePadding>
            <Link href={`/profile/${profile?.id}`} className="flex grow">
                <ListItemButton sx={{                    
                    py: 2,
                    gap: 2
                }}>
                    <Avatar alt="avatar" src={profile?.avatar} sx={{ width: 50, height: 50 }} />

                    <label>{profile?.name}</label>
                </ListItemButton>
            </Link>
        </ListItem>
    );
}