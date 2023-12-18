import { cleanup, screen } from "@testing-library/react";
import ChatInputBar from "../input-bar.component";
import { vi } from "vitest";
import { renderWithProviders } from "@/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

let sentMessage: string | undefined;
const onSend = vi.fn((val: string | undefined) => sentMessage = val);

describe("Input Bar Component", () => {
    beforeEach(() => {
        renderWithProviders(<ChatInputBar onSend={onSend} />);
    });

    afterEach(() => {
        cleanup();
    });

    it("should have an input field", () => {
        const input = screen.getByRole("textbox", { name: "chat-input" });
        expect(input).toBeInTheDocument();
    });

    it("should pass the input value to the onSend callback", async () => {
        const input = screen.getByRole("textbox", { name: "chat-input" });

        const testMessage = faker.string.alphanumeric(50);
        await userEvent.type(input, testMessage);

        const sendButton = screen.getByRole("button", { name: "send-button" });
        await userEvent.click(sendButton);

        expect(onSend).toHaveBeenCalled();
        expect(sentMessage).toEqual(testMessage);
    });
});