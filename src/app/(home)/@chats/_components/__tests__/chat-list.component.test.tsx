import { IUserChatDto } from "@/dtos/chats/chats.dtos";
import { HttpResponse, delay, http } from "msw";
import { setupServer } from "msw/node";
import { createUserChats } from "../../../../../../__mocks__/chat.mocks";
import { renderWithProviders } from "@/utils/test-utils";
import ChatList from "../chat-list.component";
import { cleanup, screen } from "@testing-library/react";

const server = setupServer(
    http.get("/api/chats/user-chats/chats", () => {
        const userChats = createUserChats(10);

        return HttpResponse.json<IUserChatDto[]>(userChats);
    })
);

beforeAll(() => server.listen());
afterEach(() => {
    cleanup();
    server.resetHandlers();
});
afterAll(() => server.close());

describe("Chat List Component", () => {
    it("should be empty if loading", () => {
        server.use(
            http.get("/api/chats/user-chats/chats", () => {
                delay("infinite");
            })
        );

        const { container } = renderWithProviders(<ChatList />);

        expect(container).toBeEmptyDOMElement();
    });

    it("should show no chat message if no chats were loaded", async () => {
        server.use(
            http.get("/api/chats/user-chats/chats", () => {
                return HttpResponse.json([]);
            })
        );

        renderWithProviders(<ChatList />);

        const noChats = await screen.findByText("No chats", { exact: false });

        expect(noChats).toBeInTheDocument();
    });

    it("should show the chat list if chats were loaded", async () => {
        renderWithProviders(<ChatList />);

        const chatList = await screen.findByRole("list");

        expect(chatList).toBeInTheDocument();
    });
});