"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Switch, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { ProfileItemType } from "./profile-list-items";
import { useCallback, useEffect, useRef, useState } from "react";
import EditProfileDrawer, { EditProfileDrawerElement } from "./edit-profile-drawer.component";
import { ToastDuration, useToast } from "@/app/_components/toast.component";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { IUserProfileDto } from "@/dtos/user/user.dtos";
import { updateUserProfile } from "@/store/services/user/user.service";

export default function EditProfileInfo({
    me,
    profileListItems,
    subscriptionListItems,
    onChange
}: {
    me?: IUserProfileDto,
    profileListItems: ProfileItemType[],
    subscriptionListItems: ProfileItemType[],
    onChange?: (data?: IUserProfileDto) => void
}) {
    const editProfileDrawerRef = useRef<EditProfileDrawerElement>(null);
    const theme = useTheme();
    const { showToast } = useToast();
    const [isSubscriptionOn, setIsSubscriptionOn] = useState(me?.isSubscriptionOn);

    const listItemTextSX: SxProps<Theme> = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "right",
        minWidth: 0,
        gap: 2,
        color: theme.palette.grey[500]
    }

    const onItemClick = (item: ProfileItemType) => {
        if (item.disableEdit) {
            showToast({
                message: `${item.label} is not editable.`,
                duration: ToastDuration.SHORT,
                severity: "warning"
            });

            return;
        }

        editProfileDrawerRef.current?.open({
            ...item,
            title: item.label,
            onSave: item.onSave,
            onChange: onChange
        });
    }

    useEffect(() => {
        const newMe = { ...me!, isSubscriptionOn };
        
        updateUserProfile(newMe).then(() => {
            if (onChange) {
                onChange()
            }
        });
    }, [isSubscriptionOn])

    return (
        <>
            <List disablePadding>
                {/* Profile Info */}
                {
                    profileListItems.map((item, idx) =>
                        <ListItemButton sx={{ gap: 2 }} key={idx} onClick={() => onItemClick(item)}>
                            <ListItemText sx={{ minWidth: "max-content" }} suppressHydrationWarning={true} primary={item.label} />
                            <Box sx={listItemTextSX}>
                                <Typography noWrap={true}>
                                    {
                                        !item.value || item.hideValue ? item.placeholder : item.value
                                    }
                                </Typography>
                                {
                                    !item.disableEdit &&
                                    <FontAwesomeIcon icon={faChevronRight} />
                                }
                            </Box>
                        </ListItemButton>
                    )
                }
                <Divider />
                {/* Subscriptions */}
                <ListItemButton onClick={() => setIsSubscriptionOn(!isSubscriptionOn)}>
                    <ListItemText primary="Enable Auto-Reply" />
                    <ListItemIcon>
                        <Switch checked={isSubscriptionOn} />
                    </ListItemIcon>
                </ListItemButton>

                {
                    <Collapse in={isSubscriptionOn}>
                        <List>
                            {
                                subscriptionListItems.map((item, idx) =>
                                    <ListItemButton sx={{ gap: 2 }} key={idx} onClick={() => onItemClick(item)}>
                                        <ListItemText sx={{ minWidth: "max-content" }} primary={item.label} />
                                        <Box sx={listItemTextSX}>
                                            <Typography noWrap={true}>
                                                {
                                                    !item.value || item.hideValue ? item.placeholder : item.value
                                                }
                                            </Typography>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </Box>
                                    </ListItemButton>
                                )
                            }
                        </List>
                    </Collapse>
                }
            </List>
            <EditProfileDrawer ref={editProfileDrawerRef} />
        </>
    )
}