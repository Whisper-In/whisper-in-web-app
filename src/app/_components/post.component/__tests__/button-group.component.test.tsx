import { cleanup, render, screen } from "@testing-library/react"
import ButtonGroup from "../button-group.component"
import { createMockPost } from "../../../../../__mocks__/post.mock"
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";

const mockOnLikeClick = vi.fn();
const mockOnShareClick = vi.fn();

describe("Post/Button Group Component", () => {
    beforeEach(() => {
        render(<ButtonGroup post={createMockPost()}
            onLikeClick={mockOnLikeClick}
            onShareClick={mockOnShareClick} />);
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    })

    it("show an avatar", () => {
        const avatar = screen.getByAltText("avatar");

        expect(avatar).toBeInTheDocument()
    });

    it("hide the avatar if the hideAvatar flag is true", () => {
        cleanup();
        render(<ButtonGroup post={createMockPost()} hideAvatar={true} />);

        const avatar = screen.queryByAltText("avatar");

        expect(avatar).toBeNull()
    });

    it("should show a like button", () => {
        const likeButton = screen.getByRole("button", { name: "like" });

        expect(likeButton).toBeInTheDocument()
    });

    it("should call onLikeClick function when the like button is clicked", async () => {
        const likeButton = screen.getByRole("button", { name: "like" });

        expect(mockOnLikeClick).not.toHaveBeenCalled();

        await userEvent.click(likeButton);

        expect(mockOnLikeClick).toHaveBeenCalledTimes(1);
    });

    it("it should show a share button", () => {
        const shareButton = screen.getByRole("button", { name: "share" });

        expect(shareButton).toBeInTheDocument();
    });

    it("should call onShareClick function when the share button is clicked", async () => {
        const shareButton = screen.getByRole("button", { name: "share" });

        expect(mockOnShareClick).not.toHaveBeenCalled();

        await userEvent.click(shareButton);

        expect(mockOnShareClick).toHaveBeenCalledTimes(1);
    });
})