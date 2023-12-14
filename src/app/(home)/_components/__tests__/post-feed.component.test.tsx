import { render, screen } from "@testing-library/react";
import PostFeed from "../post-feed.component";
import { createMockPost } from "../../../../../__mocks__/post.mocks";

describe("Post Feed Component", () => {
    it("should return null if is loading", () => {
        const { container } = render(<PostFeed isLoading={true} />)

        expect(container).toBeEmptyDOMElement();
    });

    it("should display the placeholder text if no posts were loaded", () => {
        const placeholder = "No posts";
        render(<PostFeed placeholder={placeholder} />)

        const noPost = screen.getByText(placeholder);
        expect(noPost).toBeInTheDocument();
    });

    it("should show the carousel if there are posts", () => {
        render(<PostFeed posts={[createMockPost()]} />)

        const carousel = screen.getByLabelText("carousel");
        expect(carousel).toBeInTheDocument();
    });

    it("should show a loading spinner if it is validating", () => {
        render(<PostFeed posts={[createMockPost()]} isValidating={true} />)

        const loading = screen.getByRole("progressbar", {
            busy: true,
            name: "validating"
        })

        expect(loading).toBeInTheDocument();
    });

    it("should not be visible if isHidden flag is true", () => {
        render(<PostFeed posts={[createMockPost()]} isHidden={true} />)

        const container = screen.getByLabelText("post-feed-container");
        expect(container).not.toBeVisible();
    });
});