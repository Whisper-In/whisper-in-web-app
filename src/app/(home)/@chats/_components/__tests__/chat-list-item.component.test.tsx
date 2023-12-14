import { cleanup, render, screen } from "@testing-library/react";
import ChatListItem from "../chat-list-item.component";
import { createMockChat } from "../../../../../../__mocks__/chat.mocks";
import { convertToMessageDate } from "@/utils/datetime.util";

const mockChat = createMockChat();

describe("Chat List Item Component", () => {
    beforeEach(() => {
        render(<ChatListItem chat={mockChat} />)
    });

    afterEach(() => {
        cleanup();
    });

    it("should have avatar with a link to the profile page", () => {
        const avatar = screen.getByLabelText("avatar");

        expect(avatar).toBeInTheDocument();

        const link = avatar.parentElement;
        expect(link).toHaveAttribute("href", `/profile/${mockChat.profile._id}`);
    });

    it("should show the profile name", () => {
        const profileName = screen.getByText(mockChat.profile.name);
        expect(profileName).toBeInTheDocument();
    });

    it("should show the last message", () => {
        const lastMessage = screen.getByText(mockChat.lastMessage.message);
        expect(lastMessage).toBeInTheDocument();
    });

    it("should show the last message date", () => {
        const lastMessageDate = convertToMessageDate(mockChat.lastMessage.createdAt);
        const lastMessageDateEl = screen.getByText(lastMessageDate!);
        expect(lastMessageDateEl).toBeInTheDocument();
    });

    it("should have a link to the chat page", () => {
        const lastMessage = screen.getByText(mockChat.lastMessage.message);
        const parent = lastMessage.parentElement;

        expect(parent).toHaveAttribute("href", `/chat/${mockChat.chatId}`);
    })
});