import { render, screen, waitFor } from "@testing-library/react";
import PostEditor, { DESCRIPTION_MAX_SIZE } from "../post-editor.component";
import { PostType } from "@/dtos/content/post.dtos";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("Post Editor Component", () => {
    it("should display an image for photo type post", () => {
        render(<PostEditor type={PostType.PHOTO} src={faker.internet.avatar()} />)

        const img = screen.getByAltText("post-image");
        expect(img).toBeInTheDocument();
    });

    it("should display a video player for video type post", () => {
        render(<PostEditor type={PostType.VIDEO} src={faker.internet.url()} />)

        const video = screen.getByLabelText("video-player");
        expect(video).toBeInTheDocument();
    });

    it("should provide an input for description", () => {
        render(<PostEditor type={PostType.PHOTO} src={faker.internet.avatar()} />)

        const descriptionInput = screen.getByRole("textbox", { name: "description" });
        expect(descriptionInput).toBeInTheDocument();
    });

    it(`should only allow maximum ${DESCRIPTION_MAX_SIZE} characters for the description`, async () => {
        render(<PostEditor type={PostType.PHOTO} src={faker.internet.avatar()} />)

        const descriptionInput = screen.getByRole("textbox", { name: "description" });
        const testText = faker.string.alphanumeric(DESCRIPTION_MAX_SIZE + 10);
        await userEvent.type(descriptionInput, testText);

        const expectedText = testText.substring(0, DESCRIPTION_MAX_SIZE);
        expect(descriptionInput).toHaveDisplayValue(expectedText);
    });

    it("should show the description text count", async () => {
        render(<PostEditor type={PostType.PHOTO} src={faker.internet.avatar()} />)

        const descriptionInput = screen.getByRole("textbox", { name: "description" });
        const testText = faker.string.alphanumeric(DESCRIPTION_MAX_SIZE / 3);
        await userEvent.type(descriptionInput, testText);

        const textCount = `${testText.length}/${DESCRIPTION_MAX_SIZE}`
        const textCountEl = await screen.findByText(textCount);
        expect(textCountEl).toBeInTheDocument();
    });

    it("should pause the video when saving", async () => {
        HTMLMediaElement.prototype.pause = vi.fn();

        render(<PostEditor type={PostType.VIDEO}
            src={faker.internet.avatar()}
            onSave={vi.fn} />)

        const video: HTMLVideoElement = screen.getByLabelText("video-player");
        const doneButton = screen.getByRole("button", { name: "done-button" });
        await userEvent.click(doneButton);

        expect(video.pause).toHaveBeenCalled();
    });

    it("should call the onSave callback", async () => {
        const onSave = vi.fn();
        render(<PostEditor type={PostType.VIDEO}
            src={faker.internet.avatar()}
            onSave={onSave} />)

        const doneButton = screen.getByRole("button", { name: "done-button" });
        await userEvent.click(doneButton);

        expect(onSave).toHaveBeenCalled();
    });

    it("should call the onCancel callback", async () => {
        const onCancel = vi.fn();
        render(<PostEditor type={PostType.VIDEO}
            src={faker.internet.avatar()}
            onCancel={onCancel} />)

        const cancelButton = screen.getByRole("button", { name: "cancel-button" });
        await userEvent.click(cancelButton);

        expect(onCancel).toHaveBeenCalled();
    });
});