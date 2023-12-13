import { render, screen } from "@testing-library/react";
import AlertPrompt from "../alert-prompt.component";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Alert Prompt Component", () => {
    it("should display the message", () => {
        const message = "test message";
        render(<AlertPrompt open={true} message={message} />);

        const dialogContent = screen.getByText(message);
        expect(dialogContent).toBeInTheDocument();
    });

    it("should display the title if provided", () => {
        const title = "Test Title";
        render(<AlertPrompt open={true} message={""} title={title} />);

        const dialogTitle = screen.getByText(title);
        expect(dialogTitle).toBeInTheDocument();
    });

    describe("Ok Button", () => {
        it("should show the Ok button when the showOk flag is true", () => {
            render(<AlertPrompt open={true} message={""} showOk={true} />);

            const okButton = screen.getByRole("button", { name: "ok-button" });
            expect(okButton).toBeInTheDocument();
        });

        it("should hide the Ok button when the showOk flag is false", () => {
            render(<AlertPrompt open={true} message={""} showOk={false} />);

            const okButton = screen.queryByRole("button", { name: "ok-button" });
            expect(okButton).not.toBeInTheDocument();
        });

        it("should show the correct Ok button text", () => {
            const okText = "Okay button text";
            render(<AlertPrompt open={true} message={""} okText={okText} />);

            const okButton = screen.getByRole("button", { name: "ok-button" });
            expect(okButton).toHaveTextContent(okText);
        });

        it("should call onOk callback when Ok button is clicked", async () => {
            const onOk = vi.fn();
            render(<AlertPrompt open={true} message={""} onOk={onOk} />);

            const okButton = screen.getByRole("button", { name: "ok-button" });

            expect(onOk).not.toHaveBeenCalled();
            await userEvent.click(okButton);
            expect(onOk).toHaveBeenCalledTimes(1);
        });

        it("should call onClose callback when Ok button is clicked", async () => {
            const onClose = vi.fn();
            render(<AlertPrompt open={true} message={""} onClose={onClose} />);

            const okButton = screen.getByRole("button", { name: "ok-button" });

            expect(onClose).not.toHaveBeenCalled();
            await userEvent.click(okButton);
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });

    describe("Cancel Button", () => {
        it("should show the Cancel button when the showCancel flag is true", () => {
            render(<AlertPrompt open={true} message={""} showCancel={true} />);

            const cancelButton = screen.getByRole("button", { name: "cancel-button" });
            expect(cancelButton).toBeInTheDocument();
        });

        it("should hide the Cancel button when the showCancel flag is false", () => {
            render(<AlertPrompt open={true} message={""} showCancel={false} />);

            const cancelButton = screen.queryByRole("button", { name: "cancel-button" });
            expect(cancelButton).not.toBeInTheDocument();
        });

        it("should show the correct Cancel button text", () => {
            const cancelText = "Okay button text";
            render(<AlertPrompt open={true} message={""} showCancel={true} cancelText={cancelText} />);

            const cancelButton = screen.getByRole("button", { name: "cancel-button" });
            expect(cancelButton).toHaveTextContent(cancelText);
        });

        it("should call onCancel callback when Cancel button is clicked", async () => {
            const onCancel = vi.fn();
            render(<AlertPrompt open={true} message={""} showCancel={true} onCancel={onCancel} />);

            const cancelButton = screen.getByRole("button", { name: "cancel-button" });

            expect(onCancel).not.toHaveBeenCalled();
            await userEvent.click(cancelButton);
            expect(onCancel).toHaveBeenCalledTimes(1);
        });

        it("should call onClose callback when Cancel button is clicked", async () => {
            const onClose = vi.fn();
            render(<AlertPrompt open={true} message={""} showCancel={true} onClose={onClose} />);

            const cancelButton = screen.getByRole("button", { name: "cancel-button" });

            expect(onClose).not.toHaveBeenCalled();
            await userEvent.click(cancelButton);
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });
});