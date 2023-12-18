import { render, screen } from "@testing-library/react";
import PostList from "../post-list.component";
import { createMockPost } from "../../../../../../__mocks__/post.mocks";

describe("Post List Component", () => {
    it("should return empty if it is loading", () => {
        const { container } = render(<PostList isLoading={true} />);

        expect(container).toBeEmptyDOMElement();
    });

    it("should show no posts text if no post was loaded", () => {
        render(<PostList />);

        const noPosts = screen.getByText(/no posts/gi);
        expect(noPosts).toBeInTheDocument();
    });

    it("should show a spinner when validating/updating the list", async () => {
        render(<PostList isValidating={true} posts={[createMockPost()]} />);

        const loading = await screen.findByRole("progressbar", { busy: true });
        expect(loading).toBeInTheDocument();
    });

    it("should have a link to view post for each post", () => {
        const mockPost = createMockPost();
        render(<PostList posts={[mockPost]} />);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/post/${mockPost._id}`)
    });
});