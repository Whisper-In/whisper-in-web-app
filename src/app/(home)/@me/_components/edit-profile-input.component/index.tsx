import { Box, Button, Drawer, DrawerProps, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { forwardRef, useState, useImperativeHandle, HTMLInputTypeAttribute } from "react";
import TextInput from "./text-input.component";
import { Validation } from "@/utils/form.util";
import AudioInput from "./audio-input.component";
import { useSpinner } from "@/app/_components/spinner.component";
import { useAlertPrompt } from "@/app/_components/alert-prompt.component";

export type InputVariant = "text-field" | "audio" | HTMLInputTypeAttribute;

export type TextInputProps = {
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

export type EditProfileInputDrawerProps = {
    title?: string,
    onSave?: (value?: any) => void
} & TextInputProps

export type EditProfileInputDrawerState = {
    open: boolean,
} & EditProfileInputDrawerProps

export type EditProfileInputDrawerType = {
    open: (props: EditProfileInputDrawerProps) => void,
    close: () => void
}

const EditProfileInputDrawer = forwardRef<EditProfileInputDrawerType>((props: DrawerProps, ref) => {
    const [drawerState, setDrawerState] = useState<EditProfileInputDrawerState>({ open: false });
    const [error, setError] = useState<string | undefined>();
    const { isShowingSpinner, showSpinner } = useSpinner();
    const { promptAlert } = useAlertPrompt();

    const handleOpen = (props: EditProfileInputDrawerProps) => {
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

        if (drawerState.onChange) {
            drawerState.onChange(value);
        }
    }

    const handleError = (error?: string) => {
        setError(error);
        if (drawerState.onError) {
            drawerState.onError(error);
        }
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
                            onClick={handleSave}
                            aria-label="save-button">
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
                            <AudioInput {...drawerState}
                                onChange={handleInputChange}
                                onError={handleError} />
                            :
                            <TextInput {...drawerState}
                                onChange={handleInputChange}
                                onError={handleError} />
                    )
                }
            </Box>
        </Drawer >
    );
});

EditProfileInputDrawer.displayName = "EditProfileDrawer";

export default EditProfileInputDrawer;