import { render, screen, waitFor } from "@testing-library/react";
import CreatePost from "../create-post.component";
import userEvent from "@testing-library/user-event";

describe("Create Post Component", () => {
    it("should show the Upload button if no media was selected", () => {
        render(<CreatePost />);

        const uploadButton = screen.getByRole("button", { name: "upload-button" });
        expect(uploadButton).toBeInTheDocument();
    });

    it("should show the post editor if a media was selected", async () => {
        render(<CreatePost />);

        const inputFile = screen.getByLabelText("file-input");
        const file = new File(["test"], "test.jpg", { type: "image/jpg" });
        await waitFor(() => userEvent.upload(inputFile, file));

        const postEditor = screen.getByLabelText("post-editor");
        expect(postEditor).toBeInTheDocument();
    });
});