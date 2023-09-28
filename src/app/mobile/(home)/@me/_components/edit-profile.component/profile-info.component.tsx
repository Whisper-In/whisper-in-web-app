"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Switch, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { ProfileItemType } from "./profile-list-items";
import { UserProfile } from "@/store/types/user.types";
import { useRef } from "react";
import EditProfileDrawer, { EditProfileDrawerElement } from "./edit-profile-drawer.component";
import { ToastDuration, useToast } from "@/components/toast.component";
import { useAppDispatch } from "@/store/hooks";
import { updateUserProfile } from "@/store/thunks/user.thunks";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function EditProfileInfo({
    me,
    profileListItems,
    subscriptionListItems
}: {
    me: UserProfile,
    profileListItems: ProfileItemType[],
    subscriptionListItems: ProfileItemType[]
}) {
    const editProfileDrawerRef = useRef<EditProfileDrawerElement>(null);
    const theme = useTheme();
    const { showToast } = useToast();
    const dispatch = useAppDispatch();

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
            onSave: item.onSave
        });
    }

    const onSubscriptionChange = () => {
        const newMe = { ...me!, isSubscriptionOn: !me?.isSubscriptionOn };
        dispatch(updateUserProfile(newMe));
    }

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
                <ListItemButton onClick={onSubscriptionChange}>
                    <ListItemText primary="Enable Subscriptions" />
                    <ListItemIcon>
                        <Switch checked={me?.isSubscriptionOn} />
                    </ListItemIcon>
                </ListItemButton>

                {
                    <Collapse in={me?.isSubscriptionOn}>
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