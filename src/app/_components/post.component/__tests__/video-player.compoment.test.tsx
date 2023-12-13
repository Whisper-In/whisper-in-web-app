import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import VideoPlayer from "../video-player.component";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import path from "path";
import { pauseStub, playStub } from "../../../../../vitest.setup";

const mockSrc = path.resolve(__dirname, "__mocks__", "mockVideo.mp4");
const mockPoster = faker.internet.url();

describe("Post/Video Player Component", () => {
    beforeEach(() => {
        render(<VideoPlayer src={mockSrc} poster={mockPoster} />);
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    })

    it("should have a video player", () => {
        const video = screen.getByLabelText("video-player");

        expect(video).toBeInTheDocument();
    });

    it("should have a poster url", () => {
        const video = screen.getByLabelText("video-player");

        expect(video).toHaveAttribute("poster", mockPoster);
    });

    it("should play the video when user clicks on it", async () => {
        const videoContainer = screen.getByLabelText("video-container");

        await userEvent.click(videoContainer);
        expect(playStub).toHaveBeenCalledTimes(1);
    });

    it("should pause the video if it is playing when user clicks on it", async () => {
        Object.defineProperty(HTMLMediaElement.prototype, "paused", {
            get() {
                return false;
            }
        });

        const videoContainer = screen.getByLabelText("video-container");

        await userEvent.click(videoContainer);
        expect(pauseStub).toHaveBeenCalledTimes(1);
    });
});