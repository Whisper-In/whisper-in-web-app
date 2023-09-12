"use client"

import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, SxProps, Theme } from "@mui/material";
import Header from "../../_components/header.component";
import { useAppDispath, useAppSelector } from "@/store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faMoon, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import * as authClientService from "@/app/_client-services/auth/auth.service";
import { useRouter } from "next/navigation";

export default function Settings() {
    const router = useRouter();
    const me = useAppSelector((state) => state.user.me)!;
    const dispatch = useAppDispath();

    const avatarSize = 80;

    if (!me) {
        return null;
    }

    const logout = () => {
        authClientService.logout(dispatch).then(() => {
            router.refresh();
        });
    }

    return (
        <main>
            <Header title="Settings" />

            <div className="flex flex-col items-center gap-3 my-5">
                <Avatar
                    src={me.avatar}
                    sx={{
                        width: avatarSize,
                        height: avatarSize,
                    }}
                />

                <label className="font-bold text-xl">
                    {me.name}
                </label>
            </div>

            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ padding: 3 }}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faMoon} fontSize={30} />
                        </ListItemIcon>
                        <ListItemText primary="Dark Mode" />
                        <ListItemIcon>
                            <Switch checked={false} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton sx={{ padding: 3 }}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faInfoCircle} fontSize={30} />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton sx={{ padding: 3 }} onClick={logout}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faRightFromBracket} fontSize={30} />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                </ListItem>
            </List>
        </main>
    )
}