import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import Post from "../post.component";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";
import { IPostDto, PostType } from "@/dtos/content/post.dtos";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/test-utils";

const server = setupServer(
    http.get("/api/content/posts/details/photoPost", (req) => {
        return HttpResponse.json<IPostDto>({
            _id: faker.database.mongodbObjectId(),
            postType: PostType[PostType.PHOTO],
            creator: {
                _id: faker.database.mongodbObjectId(),
                isFollowing: false,
                userName: faker.internet.userName(),
                avatar: faker.internet.avatar()
            },
            description: faker.lorem.text(),
            likeCount: faker.number.int({ min: 0, max: 1000 }),
            postURL: faker.internet.url()
        })
    }),
    http.get("/api/content/posts/details/videoPost", (req) => {
        return HttpResponse.json<IPostDto>({
            _id: faker.database.mongodbObjectId(),
            postType: PostType[PostType.VIDEO],
            creator: {
                _id: faker.database.mongodbObjectId(),
                isFollowing: false,
                userName: faker.internet.userName(),
                avatar: faker.internet.avatar()
            },
            description: faker.lorem.text(),
            likeCount: faker.number.int({ min: 0, max: 1000 }),
            postURL: faker.internet.url()
        })
    }),
    http.get("/api/content/posts/details/invalid", (req) => {
        return new HttpResponse()
    }),
    http.post("/api/content/posts/like", () => {
        return new HttpResponse();
    })
)

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Post Component", () => {
    it("should show loading progress", async () => {
        renderWithProviders(<Post postId="invalid" />);

        const loadingProgress = screen.getByRole("progressbar", { busy: true });
        expect(loadingProgress).toBeInTheDocument()
    });

    it("should display an image for PHOTO postType", async () => {
        renderWithProviders(<Post postId="photoPost" />);

        await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { busy: true }));

        const img = screen.getByLabelText("post-image");

        expect(img).toBeInTheDocument()
    });

    it("should display video player for VIDEO postType", async () => {
        renderWithProviders(<Post postId="videoPost" />);

        await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { busy: true }));

        const videoPlayer = screen.getByLabelText("video-player");

        expect(videoPlayer).toBeInTheDocument()
    });

    it("should show message when post is not found", async () => {
        renderWithProviders(<Post postId="invalid" />);

        await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { busy: true }));

        const unableToLoadText = screen.getByText("Unable to load post.");

        expect(unableToLoadText).toBeInTheDocument()
    });

    it("should like the post on double click", async () => {
        renderWithProviders(<Post postId="photoPost" />);

        await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { busy: true }));

        const postContainer = screen.getByLabelText("post-container");
        const likePrompt = screen.getByLabelText("like-prompt");

        expect(likePrompt).not.toBeVisible();

        await userEvent.dblClick(postContainer);

        expect(likePrompt).toBeVisible();
    })
})