import { UserProfile } from "@/store/types/user.types";
import { Avatar, Box, Button } from "@mui/material";
import { useRef } from "react";
import { useSpinner } from "@/app/_components/spinner.component";
import { useAlertPrompt } from "@/app/_components/alert-prompt.component";
import { IUserProfileDto } from "@/dtos/user/user.dtos";
import { updateUserAvatar } from "@/store/services/user/user.service";

export default function EditAvatar({ me, onChange }: { me?: IUserProfileDto, onChange?: () => void }) {
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const { showSpinner } = useSpinner();
    const { promptAlert } = useAlertPrompt();

    const handleChangeAvatar = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click();
        }
    }

    const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            const avatar = e.currentTarget.files.item(0);

            showSpinner(true);

            updateUserAvatar(avatar!)
                .then(() => {
                    if (onChange) {
                        onChange();
                    }
                })
                .catch((error) => {
                    promptAlert({
                        title: "Update Avatar Failed",
                        message: "Oops, failed to update avatar. Please try again later."
                    })
                })
                .finally(() => {
                    showSpinner(false);

                    if (avatarInputRef.current) {
                        avatarInputRef.current.value = "";
                    }
                });
        }
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            marginBottom: 2
        }}>
            <Avatar alt="avatar"
                sx={{ width: 96, height: 96 }}
                src={me?.avatar} />

            <Button variant="outlined"
                aria-label="change-avatar"
                onClick={handleChangeAvatar}>
                Change Avatar
            </Button>

            <input ref={avatarInputRef}
                aria-label="file-input"
                onChange={updateAvatar}
                type="file"
                accept=".jpg,.jpeg,.png"
                hidden={true} />
        </Box>
    );
}