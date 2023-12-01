"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setDarkMode } from "@/store/slices/app.slice"
import { faCog, faInfoCircle, faMoon, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ListItemIcon, ListItemText, Menu, MenuItem, Switch } from "@mui/material"
import { useState } from "react"
import * as authClientService from "@/store/services/auth/auth.service";
import { useRouter } from "next/navigation"
import { useSpinner } from "@/app/_components/spinner.component"
import dynamic from "next/dynamic"

const EditProfile = dynamic(() =>
    import("./edit-profile.component"),
    { ssr: false })

export default function SettingsMenu({ className }
    : { className?: string }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
    const open = Boolean(anchorEl);
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const { showSpinner } = useSpinner();
    const isDarkMode = useAppSelector((state) => state.app.darkMode);
    const dispatch = useAppDispatch();

    const settings = [
        {
            label: "Dark Mode",
            icon: faMoon,
            leftComponent: <Switch checked={isDarkMode} />,
            onClick: () => dispatch(setDarkMode(!isDarkMode))
        },
        {
            label: "Edit Profile",
            icon: faUser,
            onClick: () => {
                setOpenEditProfile(true);
                handleClose();
            }
        },
        {
            label: "About",
            icon: faInfoCircle,
            onClick: () => {
                window.open(process.env.NEXT_PUBLIC_WHISPERIN_URL, "_blank");
                handleClose();
            }
        },
        {
            label: "Log Out",
            icon: faRightFromBracket,
            onClick: () => {
                handleClose();
                logout();
            }
        }
    ];

    const logout = () => {
        showSpinner(true);
        authClientService.logout(dispatch)
            .then(() => {
                router.refresh();
            })
            .finally(() => showSpinner(false));
    }

    const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div className={className}>
            <button onClick={onOpen}>
                <FontAwesomeIcon icon={faCog} fontSize={25} />
            </button>

            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                {
                    settings.map((item, idx) =>
                        <MenuItem key={idx} onClick={item.onClick}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={item.icon} fontSize={20} />
                            </ListItemIcon>
                            <ListItemText>
                                {item.label}
                            </ListItemText>
                            {
                                item.leftComponent &&
                                <ListItemIcon>
                                    {item.leftComponent}
                                </ListItemIcon>
                            }
                        </MenuItem>
                    )
                }
            </Menu>

            <EditProfile
                open={openEditProfile}
                handleClose={() => setOpenEditProfile(false)}
            />
        </div>
    )
}