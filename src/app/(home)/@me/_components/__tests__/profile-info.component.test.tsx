import { renderWithProviders } from "@/utils/test-utils";
import { setupServer } from "msw/node";
import MyProfileInfo from "../profile-info.component";
import { HttpResponse, http } from "msw";
import { mockUserProfile } from "../../../../../../__mocks__/profile.mocks";
import { IUserProfileDto } from "@/dtos/user/user.dtos";
import { act, cleanup, screen } from "@testing-library/react";

const server = setupServer(
    http.get("/api/user", async () => {
        return HttpResponse.json<IUserProfileDto>(mockUserProfile);
    }),
    http.put("/api/user", async () => { })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
    server.resetHandlers();
    cleanup();
});

describe("Profile Info Component", () => {
    beforeEach(async () => {
        renderWithProviders(<MyProfileInfo />);
    });

    it("should display the avatar", async () => {
        const avatar = await screen.findByAltText("avatar");

        expect(avatar).toBeInTheDocument();
    });

    it("should display the username", async () => {
        const userName = await screen.findByText(`@${mockUserProfile.userName}`);

        expect(userName).toBeInTheDocument();
    });

    it("should display the post count", async () => {
        const postCount = await screen.findByLabelText("Posts");

        expect(postCount).toHaveTextContent(mockUserProfile.postCount!.toString());
    });

    it("should display the followers count", async () => {
        const followersCount = await screen.findByLabelText("Followers");

        expect(followersCount).toHaveTextContent(mockUserProfile.followerCount!.toString());
    });

    it("should display the likes count", async () => {
        const likesCount = await screen.findByLabelText("Likes");

        expect(likesCount).toHaveTextContent(mockUserProfile.totalLikeCount!.toString());
    });
})