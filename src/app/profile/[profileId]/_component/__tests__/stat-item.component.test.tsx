import { render, screen } from "@testing-library/react";
import StatItem from "../stat-item.component";

const label = "Test";
const value = 99;

describe("Stat Item Component", () => {
    beforeEach(() => {
        render(<StatItem label={label} value={value} />)
    });

    it("should display the value", () => {
        const valueEl = screen.getByLabelText(label);
        expect(valueEl).toHaveTextContent(value.toString());
    });

    it("should display the label", () => {
        const labelEl = screen.getByText(label);
        expect(labelEl).toBeInTheDocument();
    });
});