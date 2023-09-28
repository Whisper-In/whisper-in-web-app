"use client"

import Header from "@/app/mobile/_components/header.component";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { GetProfileListItems, GetSubscriptionListItems } from "./profile-list-items";
import { fetchUserProfile } from "@/store/thunks/user.thunks";
import { useAlertPrompt } from "@/components/alert-prompt.component";
import { Validator } from "@/utils/form.util";
import EditAvatar from "./avatar.component";
import EditProfileInfo from "./profile-info.component";
import * as configClientService from "@/app/_client-services/business/config.client-service";


export default function EditProfile({ open, handleClose }
    : { open: boolean, handleClose?: () => void }) {
    const { promptAlert } = useAlertPrompt();
    const [minSubscriptionFee, setMinSubscriptionFee] = useState(0);
    const me = useAppSelector((state) => state.user.me)!;
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
            dispatch(fetchUserProfile());
        } else {

        }
    }, [open]);

    useEffect(() => {
        configClientService.getMinSubscriptionFee().then((result) => {
            setMinSubscriptionFee(Number.parseFloat(result.configValue));
        }).catch((error) => {
            console.log("Failed to retrieve minimum subscription fee.");
        });
    }, [])

    return (
        <>
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

                <Box sx={{
                    width: "100vw",
                    height: "100%",
                    overflowY: "auto",
                    paddingY: 5
                }}>
                    <EditAvatar me={me} />

                    <EditProfileInfo me={me}
                        profileListItems={profileListItems}
                        subscriptionListItems={subscriptionListItems} />
                </Box>
            </Drawer>
        </>
    )
}