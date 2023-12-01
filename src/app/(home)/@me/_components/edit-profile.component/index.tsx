"use client"

import Header from "@/app/_components/header.component";
import { useAppDispatch } from "@/store/hooks";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, Stack } from "@mui/material";
import { useEffect } from "react";
import { GetProfileListItems, GetSubscriptionListItems } from "./profile-list-items";
import { useAlertPrompt } from "@/app/_components/alert-prompt.component";
import { Validator } from "@/utils/form.util";
import EditAvatar from "./avatar.component";
import EditProfileInfo from "./profile-info.component";
import { useGetUserProfile } from "@/store/hooks/user.hooks";
import { useGetMinSubscriptionFee } from "@/store/hooks/business.hooks";

export default function EditProfile({ open, handleClose }
    : { open: boolean, handleClose?: () => void }) {
    const { promptAlert } = useAlertPrompt();

    const { data: minSubscriptionFee } = useGetMinSubscriptionFee();

    const { data: me, mutate: updateUserProfile } = useGetUserProfile();

    const dispatch = useAppDispatch();

    const profileListItems = GetProfileListItems({ me, dispatch });
    const subscriptionListItems = GetSubscriptionListItems({ me, minSubscriptionFee, dispatch });

    const validateInputs = () => {
        if (me?.isSubscriptionOn) {
            for (let item of subscriptionListItems) {
                if (item.variant == "audio" || !item.value?.length && !item.required) {
                    continue;
                }

                const error = Validator(item.value, item.validations);

                if (error) {
                    promptAlert({
                        title: item.label,
                        message: error
                    });

                    return false;
                }
            }
        }

        return true;
    }

    const _handleClose = () => {
        if (!validateInputs()) {
            return;
        }

        if (handleClose) {
            handleClose();
        }
    }

    useEffect(() => {
        if (open) {
            updateUserProfile();
        } else {

        }
    }, [open]);

    return (
        <Drawer variant="persistent"
            hideBackdrop={true}
            open={open}
            onClose={_handleClose}
            anchor="right">
            <Header title="Edit Profile"
                leftComponent={
                    <button onClick={_handleClose}>
                        <FontAwesomeIcon icon={faClose} fontSize={25} />
                    </button>
                }
            />

            <Stack maxWidth="100vw"
                sx={{
                    overflowY: "auto",
                    paddingY: 5,
                }}>
                <EditAvatar me={me} onChange={updateUserProfile} />

                <EditProfileInfo me={me}
                    profileListItems={profileListItems}
                    subscriptionListItems={subscriptionListItems}
                    onChange={updateUserProfile} />
            </Stack>
        </Drawer>
    )
}