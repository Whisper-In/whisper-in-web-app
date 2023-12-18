import { renderWithProviders } from "@/utils/test-utils";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import MessageList from "../message-list.component";
import { mockChatMessageList } from "../../../../../../__mocks__/chat.mocks";
import { vi } from "vitest";
import { convertToMessageDateGroup, isDateEqual } from "@/utils/datetime.util";
import userEvent from "@testing-library/user-event";

const onScrollEnd = vi.fn();

describe("Message List Component", () => {
    beforeEach(() => {
        renderWithProviders(<MessageList messageList={mockChatMessageList}
            isTyping={true}
            chatId={mockChatMessageList.chatId}
            onScrollEnd={onScrollEnd} />)
    });

    afterEach(() => {
        cleanup();
    });

    it("should show the list of messages", () => {
        for (const message of mockChatMessageList.messages) {
            const messageBubble = screen.queryByText(message.message, {
                collapseWhitespace: false
            });

            expect(messageBubble).toBeInTheDocument();
        }
    });

    it("should call onScrollEnd when the scroll reached the top", async () => {
        const messageList = screen.getByRole("list");

        await fireEvent.scroll(messageList, {
            target: {
                scrollTop: 0
            }
        });

        expect(onScrollEnd).toHaveBeenCalled();
    });

    it("should show the typing bubble when isTyping is true", () => {
        const typingBubble = screen.getByLabelText("typing");
        expect(typingBubble).toBeInTheDocument();
    });

    it("should display the date above the first message of each date", () => {
        for (let idx in mockChatMessageList.messages) {
            const messageIdx = Number.parseInt(idx);
            const message = mockChatMessageList.messages[messageIdx];
            const nextMessage = mockChatMessageList.messages[messageIdx + 1];

            if (messageIdx == mockChatMessageList.totalMessages - 1 || !isDateEqual(message.createdAt!, nextMessage.createdAt!)) {
                const messageBubble = screen.queryByText(message.message, {
                    collapseWhitespace: false
                });

                expect(messageBubble?.parentElement?.parentElement?.nextSibling).toHaveTextContent(convertToMessageDateGroup(message.createdAt)!)
            }
        }
    });

    it("should hide the 'scroll to bottom' button if the scroll position is at the bottom", async () => {
        const scrollToBottom = screen.queryByRole("button", { name: "scroll-to-bottom-button" });

        expect(scrollToBottom).not.toBeInTheDocument();
    })

    it("should show the 'scroll to bottom' button if the scroll position is not at the bottom", async () => {
        const messageList = screen.getByRole("list");

        await fireEvent.scroll(messageList, {
            target: {
                scrollTop: messageList.scrollHeight / 2
            }
        });

        const scrollToBottom = screen.queryByRole("button", { name: "scroll-to-bottom-button" });

        expect(scrollToBottom).toBeInTheDocument();
    });

    it("should scroll to bottom when the 'scroll to bottom' button is clicked", async () => {
        const messageList = screen.getByRole("list");

        await fireEvent.scroll(messageList, {
            target: {
                scrollTop: messageList.scrollHeight / 2
            }
        });

        const scrollToBottom = screen.getByRole("button", { name: "scroll-to-bottom-button" });

        await userEvent.click(scrollToBottom);
        
        expect(messageList.scrollTop).toEqual(messageList.scrollHeight);
    });
});