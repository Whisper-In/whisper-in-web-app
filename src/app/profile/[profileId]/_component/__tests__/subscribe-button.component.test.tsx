import { render, screen } from "@testing-library/react";
import SubscribeButton from "../subscribe-button.component";
import { mockProfile } from "../../../../../../__mocks__/profile.mocks";

describe("Subscribe Button Component", () => {
    it("should display 'Subscribe' and price text if not subscribed to the profile", () => {
        render(<SubscribeButton profile={mockProfile} />);
        screen.debug();
        const button = screen.getByRole("button", { name: "subscribe-button" });
        expect(button).toHaveTextContent("Subscribe");
        expect(button).toHaveTextContent(`$${mockProfile.priceTiers[0].price}`);
    });

    it("should display 'Subscribed' text if subscribed to the profile", () => {
        render(<SubscribeButton profile={{
            ...mockProfile,
            isSubscribed: true
        }} />);

        const button = screen.getByRole("button", { name: "subscribe-button" });
        expect(button).toHaveTextContent("Subscribed");
    });
});