import { renderWithProviders } from "@/utils/test-utils";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import MessageList from "../message-list.component";
import { mockChatMessageList } from "../../../../../../__mocks__/chat.mocks";
import { vi } from "vitest";
import { convertToMessageDateGroup, isDateEqual } from "@/utils/datetime.util";

const onScrollEnd = vi.fn();

describe("Message List Component", () => {
    beforeEach(() => {
        renderWithProviders(<MessageList messagesList={[mockChatMessageList]}
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

    it("should call onScrollEnd when the scroll reached the top", () => {
        const messageList = screen.getByRole("list");

        fireEvent.scroll(messageList, {
            scrollY: messageList.scrollHeight
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
});