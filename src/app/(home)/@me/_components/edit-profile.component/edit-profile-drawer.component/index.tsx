import { Box, Button, Drawer, DrawerProps, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { forwardRef, useState, useImperativeHandle, HTMLInputTypeAttribute } from "react";
import EditInput from "./edit-input.component";
import { Validation } from "@/utils/form.util";
import EditAudio from "./edit-audio.component";
import { useSpinner } from "@/app/_components/spinner.component";
import { useAlertPrompt } from "@/app/_components/alert-prompt.component";

export type InputVariant = "text-field" | "audio" | HTMLInputTypeAttribute;

export type EditInputProps = {
    value?: string,
    required?: boolean,
    min?: number,
    max?: number,
    maxLength?: number,
    onChange?: (value?: any) => void,
    onError?: (error?: string) => void,
    variant?: InputVariant,
    validations?: Validation[]
}

export type EditProfileDrawerProps = {
    title?: string,
    onSave?: (value?: any) => void
} & EditInputProps

export type EditProfileDrawerState = {
    open: boolean,
} & EditProfileDrawerProps

export type EditProfileDrawerElement = {
    open: (props: EditProfileDrawerProps) => void,
    close: () => void
}

const EditProfileDrawer = forwardRef<EditProfileDrawerElement>((props: DrawerProps, ref) => {
    const [drawerState, setDrawerState] = useState<EditProfileDrawerState>({ open: false });
    const [error, setError] = useState<string | undefined>();
    const { isShowingSpinner, showSpinner } = useSpinner();
    const { promptAlert } = useAlertPrompt();

    const handleOpen = (props: EditProfileDrawerProps) => {
        setDrawerState({
            open: true,
            ...props
        });
    }

    const handleClose = () => setDrawerState({
        ...drawerState,
        open: false
    });

    const handleSave = async () => {
        if (error) {
            return;
        }

        try {
            if (drawerState.onSave) {
                showSpinner(true);
                await drawerState.onSave(drawerState.value);
            }

            if (drawerState.onChange) {
                drawerState.onChange();
            }

            handleClose();
        } catch (error) {
            promptAlert({
                title: "Save Failed",
                message: "Oops, failed to save. Please try again."
            })
        } finally {
            showSpinner(false);
        }
    }

    useImperativeHandle(ref, () => ({
        open: handleOpen,
        close: handleClose
    }), []);

    const handleInputChange = (value?: string) => {
        setDrawerState({
            ...drawerState,
            value
        });
    }

    const handleError = (error?: string) => {
        setError(error);
    }

    return (
        <Drawer PaperProps={{
            sx: {
                left: "50%",
                translate: "-50% 0",
                maxWidth: "100vw",
                width: (theme) => theme.breakpoints.values.md,
            }
        }}
            variant="temporary"
            open={drawerState.open}
            anchor="bottom"
            onClose={handleClose}
            {...props}>
            <Paper elevation={5}>
                <Toolbar>
                    <Stack width="100%"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between">
                        <Button color="primary"
                            onClick={handleClose}>
                            Cancel
                        </Button>
                        <Typography fontWeight={700}>
                            {drawerState.title}
                        </Typography>

                        <Button color="error"
                            disabled={error != undefined || isShowingSpinner}
                            onClick={handleSave}>
                            Save
                        </Button>
                    </Stack>
                </Toolbar>
            </Paper>

            <Box pb={2} maxWidth="100vw">
                {
                    drawerState.open &&
                    (
                        drawerState.variant == "audio" ?
                            <EditAudio {...drawerState}
                                onChange={handleInputChange}
                                onError={handleError} />
                            :
                            <EditInput {...drawerState}
                                onChange={handleInputChange}
                                onError={handleError} />
                    )
                }
            </Box>
        </Drawer >
    );
});

EditProfileDrawer.displayName = "EditProfileDrawer";

export default EditProfileDrawer;