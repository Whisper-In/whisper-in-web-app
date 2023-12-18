import { renderWithProviders } from "@/utils/test-utils";
import { setupServer } from "msw/node";
import EditAvatar from "../edit-avatar.component";
import { vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockUserProfile } from "../../../../../../../__mocks__/profile.mocks";
import userEvent from "@testing-library/user-event";
import { HttpResponse, delay, http } from "msw";

const server = setupServer(
    http.put("/api/user/avatar", async () => {        
        return new HttpResponse();
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const onChange = vi.fn();

describe("Edit Profile/Avatar Component", () => {
    beforeEach(() => {
        renderWithProviders(<EditAvatar me={mockUserProfile} onChange={onChange} />)
    });

    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    it("should show the avatar", () => {
        const avatar = screen.getByAltText("avatar");
        expect(avatar).toBeInTheDocument();
    });

    it("should call onChange callback when the avatar is updated", async () => {
        const fileInput: HTMLInputElement = screen.getByLabelText("file-input");
        const file = new File(["test"], "test.jpg");

        await waitFor(() => userEvent.upload(fileInput, file));

        expect(onChange).toHaveBeenCalled();
    });

    it("should only allow image file types", async () => {
        server.use(
            http.put("/api/user/avatar", async () => {
                await delay("infinite");
            })
        )

        const fileInput: HTMLInputElement = screen.getByLabelText("file-input");

        const imageTypes = ["png", "jpeg", "jpg"];
        for (const imageType of imageTypes) {
            const file = new File(["test"], `test.${imageType}`, { type: `image/${imageType}` });
            await waitFor(() => userEvent.upload(fileInput, file));

            expect(fileInput.files?.item(0)).toBe(file);
            expect(fileInput.files).toHaveLength(1);
        }
    });

    it("should show the spinner when updating the avatar", async () => {
        server.use(
            http.put("/api/user/avatar", async () => {
                await delay("infinite");
            })
        )

        const fileInput: HTMLInputElement = screen.getByLabelText("file-input");
        const file = new File(["test"], "test.jpg");
        await userEvent.upload(fileInput, file);

        const loading = screen.getByRole("progressbar", { busy: true });

        expect(loading).toBeVisible();
    });
});