import { cleanup, render, screen } from "@testing-library/react";
import SearchListItem from "../search-list-item.component";
import { mockProfile, mockProfileSearch } from "../../../../../../__mocks__/profile.mocks";

describe("Search List Item Component", () => {
    beforeEach(() => {
        render(<SearchListItem profile={mockProfileSearch} />);
    });

    afterEach(() => {
        cleanup();
    })

    it("should have an avatar", () => {
        const avatar = screen.getByAltText("avatar");
        expect(avatar).toBeInTheDocument();
    });

    it("should redirect to the profile page", () => {
        const avatar = screen.getByAltText("avatar");

        const link = avatar?.parentElement?.parentElement;
        expect(link).toHaveAttribute("href", `/profile/${mockProfileSearch.id}`);
    });

    it("should have a profile name", () => {
        const profileName = screen.getByText(mockProfileSearch.name);

        expect(profileName).toBeInTheDocument();
    });
});