import { render, screen } from "@testing-library/react";
import SearchList from "../search-list.component";
import { mockProfileSearch } from "../../../../../../__mocks__/profile.mocks";

describe("Search List Component", () => {
    it("should show no results found", () => {
        render(<SearchList />);

        const noResults = screen.queryByText("No results", { exact: false });

        expect(noResults).toBeInTheDocument();
    });

    it("it should show list of items", () => {
        render(<SearchList searchResults={[
            mockProfileSearch
        ]} />);

        const listItems = screen.queryAllByRole("listitem");
        expect(listItems.length).toBeGreaterThan(0);
    });
});