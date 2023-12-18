import { render, screen } from "@testing-library/react";
import FollowButton from "../follow-button.component";
import { mockProfile } from "../../../../../../__mocks__/profile.mocks";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Follow Button Component", () => {
    it("should display 'Follow' text if user is not following the profile", () => {
        render(<FollowButton profile={mockProfile} />)

        const button = screen.getByRole("button", { name: "follow-button" });
        expect(button).toHaveTextContent("Follow");
    });

    it("should display 'Following' text if user is following the profile", () => {
        render(<FollowButton profile={{ ...mockProfile, isFollowing: true }} />)

        const button = screen.getByRole("button", { name: "follow-button" });
        expect(button).toHaveTextContent("Following");
    });

    it("should call the onClick callback", async () => {
        const onClick = vi.fn();
        render(<FollowButton profile={mockProfile} onClick={onClick} />)

        const button = screen.getByRole("button", { name: "follow-button" });
        await userEvent.click(button);

        expect(onClick).toHaveBeenCalled();
    });
});