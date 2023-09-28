import { UserProfile } from "@/store/types/user.types";
import { Avatar, Box, Button } from "@mui/material";
import { useRef } from "react";
import { useSpinner } from "@/components/spinner.component";
import { useAppDispatch } from "@/store/hooks";
import { updateUserAvatar } from "@/store/thunks/user.thunks";
import { useAlertPrompt } from "@/components/alert-prompt.component";
import { setUser } from "@/store/slices/user.slice";

export default function EditAvatar({ me }: { me: UserProfile }) {
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const { showSpinner } = useSpinner();
    const { promptAlert } = useAlertPrompt();
    const dispatch = useAppDispatch();

    const handleChangeAvatar = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click();
        }
    }

    const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            const avatar = e.currentTarget.files.item(0);

            showSpinner(true);
            
            dispatch(updateUserAvatar(avatar!))
                .catch((error) => {
                    promptAlert({
                        title: "Update Avatar Failed",
                        message: "Oops, failed to update avatar. Please try again later."
                    })
                })
                .finally(() => {
                    showSpinner(false);
                });

            e.currentTarget.value = "";
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
            <Avatar          
                sx={{ width: 96, height: 96 }}
                src={me?.avatar} />

            <Button variant="outlined" onClick={handleChangeAvatar}>
                Change Avatar
            </Button>

            <input ref={avatarInputRef}
                onChange={updateAvatar}
                type="file"
                accept=".jpg,.jpeg,.png"
                hidden={true} />
        </Box>
    );
}