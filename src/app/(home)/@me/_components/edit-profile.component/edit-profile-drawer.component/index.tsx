import Header from "@/app/_components/header.component";
import { Box, Button, Drawer, DrawerProps, useFormControl } from "@mui/material";
import { forwardRef, useState, useImperativeHandle, useRef, HTMLInputTypeAttribute } from "react";
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
        <Drawer
            variant="persistent"
            open={drawerState.open}
            anchor="right"
            onClose={handleClose}
            {...props}>

            <Header title={drawerState.title}
                titleAlignment="center"
                leftComponent={
                    <Button color="primary"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                }
                rightComponent={
                    <Button color="error"
                        disabled={error != undefined || isShowingSpinner}
                        onClick={handleSave}>
                        Save
                    </Button>
                }
            />

            <Box sx={{ width: "100vw" }}>
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
        </Drawer>
    );
});

EditProfileDrawer.displayName = "EditProfileDrawer";

export default EditProfileDrawer;