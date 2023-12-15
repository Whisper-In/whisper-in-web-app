import { cleanup, render, screen } from "@testing-library/react";
import SearchInput from "../search-input.component";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

const onChange = vi.fn();

beforeEach(() => {
    render(<SearchInput onChange={onChange} />)
});

afterEach(() => {
    cleanup();
});

describe("Search Input Component", () => {
    it("should have a maximum length of 50", async () => {
        const input: HTMLInputElement = screen.getByLabelText("search-input");

        const testText = faker.string.alphanumeric({
            length: 100
        });
        await userEvent.click(input);
        await userEvent.keyboard(testText);

        const expectedText = testText.substring(0, 50);
        expect(input.value).toEqual(expectedText)
    });

    it("should call the onChange callback when the input changes", async () => {
        const input: HTMLInputElement = screen.getByLabelText("search-input");

        await userEvent.click(input);
        await userEvent.keyboard("test");

        expect(onChange).toHaveBeenCalled();
    });
});