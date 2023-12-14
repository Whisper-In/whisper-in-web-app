import { render, screen } from "@testing-library/react";
import { createMockPost } from "../../../../../__mocks__/post.mocks"
import InfoGroup from "../info-group.component";

const mockPost = createMockPost();

describe("Post/Info Group Component", () => {
    beforeEach(() => {
        render(<InfoGroup post={mockPost} />)
    });

    it("should show the creator user name", () => {
        const userName = screen.getByText(`@${mockPost.creator.userName}`);

        expect(userName).toBeInTheDocument();
    });

    it("should show the post description", () => {
        const postDescription = screen.getByLabelText("description");

        expect(postDescription).toBeInTheDocument();
    });
})