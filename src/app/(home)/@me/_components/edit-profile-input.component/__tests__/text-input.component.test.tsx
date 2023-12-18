import { render, screen } from "@testing-library/react";
import TextInput from "../text-input.component";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { TextInputProps } from "..";
import { vi } from "vitest";

const TextInputWrapper = (props: TextInputProps) => {
    const [value, setValue] = useState();

    const onChange = (val: any) => {
        if (props.onChange) {
            props.onChange();
        }

        setValue(val);
    }

    return (
        <TextInput {...props} value={value} onChange={onChange} />
    )
}


describe("Edit Profile Input/Text Input Component", () => {
    it("should follow the max length", async () => {
        const maxLength = 50;
        render(<TextInputWrapper maxLength={maxLength} />);

        const textField: HTMLInputElement = screen.getByRole("textbox");
        const testText = faker.string.alphanumeric({ length: maxLength * 2 })

        await userEvent.type(textField, testText);

        const expectedText = testText.substring(0, maxLength);
        expect(textField).toHaveDisplayValue(expectedText);
    });

    it("should show the text count if max length is provided", () => {
        const maxLength = 50;
        render(<TextInputWrapper maxLength={maxLength} />);

        const textCount = screen.queryByText(`0/${maxLength}`);

        expect(textCount).toBeInTheDocument();
    });

    it("should update the text count when input is updated", async () => {
        const maxLength = 50;
        render(<TextInputWrapper maxLength={maxLength} />);

        const textField: HTMLInputElement = screen.getByRole("textbox");
        const testText = faker.string.alphanumeric({ length: maxLength / 2 })

        await userEvent.type(textField, testText);

        const textCount = screen.queryByText(`${testText.length}/${maxLength}`);

        expect(textCount).toBeInTheDocument();
    });

    it("should show error for the min validation", async () => {
        const min = -faker.number.int(99);
        const minError = "Min Error";
        render(<TextInputWrapper max={min}
            validations={[{
                min,
                customErrors: {
                    min: minError
                }
            }]}
            variant="number" />);

        const textField: HTMLInputElement = screen.getByRole("spinbutton");
        const testValue = min * 2;

        await userEvent.type(textField, testValue.toString());
        await userEvent.tab();

        const error = await screen.findByText(minError);

        expect(error).toBeInTheDocument();
    });

    it("should show error for the max validation", async () => {
        const max = faker.number.int(999);
        const maxError = "Max Error";
        render(<TextInputWrapper max={max}
            validations={[{
                max,
                customErrors: {
                    max: maxError
                }
            }]}
            variant="number" />);

        const textField: HTMLInputElement = screen.getByRole("spinbutton");
        const testValue = max * 2;

        await userEvent.type(textField, testValue.toString());
        await userEvent.tab();

        const error = await screen.findByText(maxError);

        expect(error).toBeInTheDocument();
    });

    it("should show error for the pattern validation", async () => {
        const pattern = new RegExp("\\d+", "gi");
        const patternError = "Pattern Error";
        render(<TextInputWrapper
            validations={[{
                pattern,
                customErrors: {
                    pattern: patternError
                }
            }]}
        />);

        const textField: HTMLInputElement = screen.getByRole("textbox");
        const testValue = faker.string.alpha(99);

        await userEvent.type(textField, testValue);
        await userEvent.tab();

        const error = await screen.findByText(patternError);

        expect(error).toBeInTheDocument();
    });

    it("should call the onChange callback", async () => {
        const onChange = vi.fn();
        render(<TextInputWrapper onChange={onChange} />);

        const textField = screen.getByRole("textbox");

        await userEvent.type(textField, "test");
        await userEvent.tab();

        expect(onChange).toHaveBeenCalled();
    });

    it("should clear the input when the clear button is clicked", async () => {
        render(<TextInputWrapper />);

        const textField: HTMLInputElement = screen.getByRole("textbox");
        const testText = faker.string.alphanumeric({ length: 100 })

        await userEvent.type(textField, testText);

        expect(textField).toHaveDisplayValue(testText);

        const clearButton = screen.getByRole("button", { name: "clear-button" });
        await userEvent.click(clearButton);

        expect(textField).toHaveDisplayValue("");
    });
});