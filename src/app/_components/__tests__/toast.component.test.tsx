import { render, screen } from "@testing-library/react";
import Toast from "../toast.component";

describe("Toast Component", () => {
    it("should contain the correct message", () => {
        const message = "Test Message"
        render(<Toast open={true}>{message}</Toast>);

        const toast = screen.getByText(message);
        expect(toast).toBeInTheDocument();
    })
});