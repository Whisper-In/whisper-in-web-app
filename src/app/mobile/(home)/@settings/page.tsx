"use client"

import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, SxProps, Theme } from "@mui/material";
import Header from "../../_components/header.component";
import { useAppDispath, useAppSelector } from "@/store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faMoon, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import * as authClientService from "@/app/_client-services/auth/auth.service";
import { useRouter } from "next/navigation";
import { setDarkMode } from "@/store/slices/app.slice";
import { useSpinner } from "@/components/spinner.component";

export default function Settings() {
    const router = useRouter();
    const me = useAppSelector((state) => state.user.me)!;
    const isDarkMode = useAppSelector((state) => state.app.darkMode);
    const dispatch = useAppDispath();
    const { showSpinner } = useSpinner();

    const avatarSize = 80;

    if (!me) {
        return null;
    }

    const settings = [
        {
            label: "Dark Mode",
            icon: faMoon,
            leftComponent: <Switch checked={isDarkMode} />,
            onClick: () => dispatch(setDarkMode(!isDarkMode))
        },
        {
            label: "About",
            icon: faInfoCircle,
            onClick: () => window.open(process.env.NEXT_PUBLIC_WHISPERIN_URL, "_blank")
        },
        {
            label: "Log Out",
            icon: faRightFromBracket,
            onClick: () => logout()
        }
    ]

    const logout = () => {
        showSpinner(true);
        authClientService.logout(dispatch)
            .then(() => {
                router.refresh();
            })
            .finally(() => showSpinner(false));
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
                {
                    settings.map((setting, idx) =>
                        <ListItem key={idx} disablePadding>
                            <ListItemButton sx={{ padding: 3 }} onClick={setting.onClick}>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={setting.icon} fontSize={30} />
                                </ListItemIcon>
                                <ListItemText primary={setting.label} />
                                {
                                    setting.leftComponent &&
                                    <ListItemIcon>
                                        {setting.leftComponent}
                                    </ListItemIcon>
                                }
                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>
        </main>
    )
}