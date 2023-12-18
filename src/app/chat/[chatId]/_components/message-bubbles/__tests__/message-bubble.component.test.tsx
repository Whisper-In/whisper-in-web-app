import { cleanup, render, screen } from "@testing-library/react";
import MessageBubble from "../message-bubble.component";
import { mockChatMessage } from "../../../../../../../__mocks__/chat.mocks";
import { renderWithProviders } from "@/utils/test-utils";
import { convertToMessageTime } from "@/utils/datetime.util";

describe("Message Bubble Component", () => {
    beforeEach(() => {
        renderWithProviders(<MessageBubble message={mockChatMessage} />);
    });

    afterEach(() => {
        cleanup();
    })

    it("should display the message", () => {
        const message = screen.getByText(mockChatMessage.message, {
            collapseWhitespace: false,
            trim: false
        });

        expect(message).toBeInTheDocument();
    });

    it("should display the message time", () => {
        const time = screen.getByText(convertToMessageTime(mockChatMessage.updatedAt!));

        expect(time).toBeInTheDocument();
    });
});