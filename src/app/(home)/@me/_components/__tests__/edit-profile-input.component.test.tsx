import { render, screen } from "@testing-library/react";
import EditProfileInputDrawer, { EditProfileInputDrawerProps, EditProfileInputDrawerType } from "../edit-profile-input.component";
import { useEffect, useRef } from "react";
import userEvent from "@testing-library/user-event";
import { ERRORS } from "@/utils/form.util";
import { faker } from "@faker-js/faker";
import { vi } from "vitest";
import { delay } from "msw";
import { renderWithProviders } from "@/utils/test-utils";

const EditProfileInputDrawerWrapper = (props: EditProfileInputDrawerProps) => {
    const ref = useRef<EditProfileInputDrawerType>(null);

    useEffect(() => {
        ref.current?.open(props);
    }, []);

    return (
        <EditProfileInputDrawer ref={ref} />
    )
}

describe("Edit Profile Input Component", () => {
    describe("Disable save button when there is error", () => {
        it("should disable if the 'min' validation failed", async () => {
            const min = 99;
            render(<EditProfileInputDrawerWrapper validations={[{
                min
            }]} />);

            const testValue = min - 1;

            const textField = screen.getByRole("textbox");
            await userEvent.type(textField, testValue.toString());
            await userEvent.tab();

            const saveButton = screen.getByRole("button", { name: "save-button" });
            expect(saveButton).toBeDisabled();
        });

        it("should disable if the 'max' validation failed", async () => {
            const max = 99;
            render(<EditProfileInputDrawerWrapper validations={[{
                max
            }]} />);

            const testValue = max + 1;

            const textField = screen.getByRole("textbox");
            await userEvent.type(textField, testValue.toString());
            await userEvent.tab();

            const saveButton = screen.getByRole("button", { name: "save-button" });
            expect(saveButton).toBeDisabled();
        });

        it("should disable if the 'maxLength' validation failed", async () => {
            const maxLength = 99;
            render(<EditProfileInputDrawerWrapper validations={[{
                maxLength
            }]} />);

            const testValue = faker.string.alphanumeric(maxLength + 1);

            const textField = screen.getByRole("textbox");
            await userEvent.type(textField, testValue);
            await userEvent.tab();

            const saveButton = screen.getByRole("button", { name: "save-button" });
            expect(saveButton).toBeDisabled();
        });

        it("should disable if the 'pattern' validation failed", async () => {
            const pattern = new RegExp("\\d+", "g");
            render(<EditProfileInputDrawerWrapper validations={[{
                pattern
            }]} />);

            const testValue = faker.string.alpha(100);

            const textField = screen.getByRole("textbox");
            await userEvent.type(textField, testValue);
            await userEvent.tab();

            const saveButton = screen.getByRole("button", { name: "save-button" });
            expect(saveButton).toBeDisabled();
        });
    });

    it("should call the onChange callback", async () => {
        const onChange = vi.fn();
        render(<EditProfileInputDrawerWrapper onChange={onChange} />);

        const textField = screen.getByRole("textbox");
        await userEvent.type(textField, "test");

        expect(onChange).toHaveBeenCalled();
    });

    it("should call the onSave callback", async () => {
        const onSave = vi.fn();
        render(<EditProfileInputDrawerWrapper onSave={onSave} />);

        const saveButton = screen.getByRole("button", { name: "save-button" });
        await userEvent.click(saveButton);

        expect(onSave).toHaveBeenCalled();
    });

    it("should show the spinner when saving", async () => {
        const onSave = vi.fn(async () => {
            await delay("infinite");
        });

        renderWithProviders(<EditProfileInputDrawerWrapper onSave={onSave} />);

        const saveButton = screen.getByRole("button", { name: "save-button" });
        await userEvent.click(saveButton);

        //the "hidden" option is caused by the drawer
        const loading = await screen.findByRole("progressbar", { busy: true, hidden: true });

        expect(loading).toBeVisible();
    });

    it("should call the onError callback", async () => {
        const onError = vi.fn();
        const maxLength = faker.number.int(99);
        render(<EditProfileInputDrawerWrapper
            onError={onError}
            validations={[{
                maxLength
            }]} />);

        const testValue = faker.string.alphanumeric(maxLength + 1);

        const textField = screen.getByRole("textbox");
        await userEvent.type(textField, testValue);
        await userEvent.tab();

        expect(onError).toHaveBeenCalled();
    });
});