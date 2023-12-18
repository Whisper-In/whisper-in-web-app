import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { mockProfile } from "../../../../../../__mocks__/profile.mocks";
import { cleanup, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import ProfileInfo from "../profile-info.component";
import { renderWithProviders } from "@/utils/test-utils";
import { IProfileDto } from "@/dtos/profile/profile.dtos";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { mockPaymentSheet } from "../../../../../../__mocks__/payment.mocks";
import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import mockRouter from "next-router-mock";

const followUser = vi.fn();
const unfollowUser = vi.fn();
const createUserSubscription = vi.fn();
const createNewChat = vi.fn();

const server = setupServer(
    http.get("/api/profile/test", () => {
        return HttpResponse.json<IProfileDto>(mockProfile)
    }),
    http.get("/api/profile/test-nosubscription", () => {
        return HttpResponse.json<IProfileDto>({
            ...mockProfile,
            isSubscriptionOn: false
        })
    }),
    http.get("/api/profile/test-followed", () => {
        return HttpResponse.json<IProfileDto>({
            ...mockProfile,
            isFollowing: true
        })
    }),
    http.post("/api/user/payment-subscription", () => {
        return HttpResponse.json<ICreatePaymentSheetDto>(mockPaymentSheet)
    }),
    http.post("/api/user/subscription", () => {
        createUserSubscription();

        return new HttpResponse();
    }),
    http.post("/api/user/follow/test", () => {
        followUser();

        return new HttpResponse();
    }),
    http.delete("/api/user/follow/test-followed", () => {
        unfollowUser();

        return new HttpResponse();
    }),
    http.get("/api/chats/user-chats", () => {
        return new HttpResponse();
    }),
    http.post("/api/chats/user-chats/new-chat", () => {
        createNewChat();

        return new HttpResponse();
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
    server.resetHandlers();
    cleanup();
    vi.clearAllMocks();
});

describe("Profile Info Component", () => {
    beforeEach(async () => {
        renderWithProviders(<ProfileInfo profileId="test" />)

        await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { busy: true }));
    });

    it("should display the avatar", async () => {
        const avatar = screen.getByAltText("avatar");

        expect(avatar).toBeInTheDocument();
    });

    it("should display the username", async () => {
        const userName = screen.getByText(`@${mockProfile.userName}`);

        expect(userName).toBeInTheDocument();
    });

    it("should display the post count", async () => {
        const postCount = screen.getByLabelText("Posts");

        expect(postCount).toHaveTextContent(mockProfile.postCount!.toString());
    });

    it("should display the follower count", async () => {
        const followerCount = screen.getByLabelText("Followers");

        expect(followerCount).toHaveTextContent(mockProfile.followerCount!.toString());
    });

    it("should display the likes count", async () => {
        const likeCount = screen.getByLabelText("Likes");

        expect(likeCount).toHaveTextContent(mockProfile.totalLikeCount!.toString());
    });

    it("should have a follow button", async () => {
        const followButton = await screen.getByRole("button", { name: "follow-button" });

        expect(followButton).toBeInTheDocument();
    });

    it("should call the follow api when clicking on the follow button", async () => {
        const followButton = await screen.getByRole("button", { name: "follow-button" });
        await userEvent.click(followButton);

        expect(followUser).toHaveBeenCalled();
    });

    it("should call the unfollow api when clicking on the follow button if the profile was followed", async () => {
        cleanup();
        renderWithProviders(<ProfileInfo profileId="test-followed" />);

        await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { busy: true }));

        const followButton = await screen.findByRole("button", { name: "follow-button" });
        await userEvent.click(followButton);

        expect(unfollowUser).toHaveBeenCalled();
    });

    it("should not have a subscribe button if the profile does not have subscription on", async () => {
        cleanup();
        renderWithProviders(<ProfileInfo profileId="test-nosubscription" />);

        await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { busy: true }));

        const subscribeButton = screen.queryByRole("button", { name: "subscribe-button" });

        expect(subscribeButton).not.toBeInTheDocument();
    });

    it("should have a subscribe button", async () => {
        const subscribeButton = screen.getByRole("button", { name: "subscribe-button" });
        expect(subscribeButton).toBeInTheDocument();
    });

    it("should show the payment form when the subscribe button is clicked", async () => {
        const subscribeButton = screen.getByRole("button", { name: "subscribe-button" });
        await userEvent.click(subscribeButton);

        const paymentForm = await screen.findByRole("form", { name: "payment-form" });
        expect(paymentForm).toBeVisible();
    });

    it("should call the subscribe api after submitting the payment", async () => {
        //Opens payment form
        const subscribeButton = screen.getByRole("button", { name: "subscribe-button" });
        await userEvent.click(subscribeButton);

        const submitButton = screen.getByRole("button", { name: "Submit" });
        await userEvent.click(submitButton);

        await waitFor(() => expect(createUserSubscription).toHaveBeenCalled());
        await waitFor(() => expect(createNewChat).toHaveBeenCalled());
    });

    it("should have a chat button", () => {
        const chatButton = screen.getByRole("button", { name: "chat-button" });
        
        expect(chatButton).toBeInTheDocument();
    });

    it("should redirect to the chat page when the chat button is clicked", async () => {
        const chatButton = screen.getByRole("button", { name: "chat-button" });
        await userEvent.click(chatButton);

        expect(mockRouter).toMatchObject({
            asPath: `/chat/${mockProfile.chatId}`,
            pathname: `/chat/${mockProfile.chatId}`
        })
    });
});