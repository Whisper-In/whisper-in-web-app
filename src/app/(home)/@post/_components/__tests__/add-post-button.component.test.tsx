import { cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import AddPostButton from "../add-post-button.component";
import userEvent from "@testing-library/user-event";

const onChange = vi.fn();

describe("Add Post Button Component", () => {
    beforeEach(() => {
        render(<AddPostButton onChange={onChange} />)
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    })

    it("should accept image file", async () => {
        const fileInput: HTMLInputElement = screen.getByLabelText("file-input");

        const file = new File(["test"], "test.jpg", { type: "image/jpg" });
        await userEvent.upload(fileInput, file);

        expect(fileInput.files?.item(0)).toBe(file);
        expect(fileInput.files).toHaveLength(1);
    });

    it("should accept video file", async () => {
        const fileInput: HTMLInputElement = screen.getByLabelText("file-input");

        const file = new File(["test"], "test.mp4", { type: "video/mp4" });
        await userEvent.upload(fileInput, file);

        expect(fileInput.files?.item(0)).toBe(file);
        expect(fileInput.files).toHaveLength(1);
    });

    it("should not accept other file type", async () => {
        const fileInput: HTMLInputElement = screen.getByLabelText("file-input");

        const file = new File(["test"], "test.txt", { type: "text/plain" });
        await userEvent.upload(fileInput, file);

        expect(fileInput.files).toHaveLength(0);
    });

    it("should call the onChange callback when the file is changed", async () => {
        const fileInput: HTMLInputElement = screen.getByLabelText("file-input");

        const file = new File(["test"], "test.mp4", { type: "video/mp4" });
        await userEvent.upload(fileInput, file);
        
        expect(onChange).toHaveBeenCalled();
    });
});