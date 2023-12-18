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
    const maxLength = 50;
    it(`should have a maximum length of ${maxLength}`, async () => {
        const textField: HTMLInputElement = screen.getByRole("textbox");
        const testText = faker.string.alphanumeric(maxLength * 2);

        await userEvent.type(textField, testText);        

        const expectedText = testText.substring(0, maxLength);
        expect(textField).toHaveDisplayValue(expectedText)
    });

    it("should call the onChange callback when the input changes", async () => {
        const textField: HTMLInputElement = screen.getByRole("textbox");

        await userEvent.type(textField, "test");

        expect(onChange).toHaveBeenCalled();
    });
});