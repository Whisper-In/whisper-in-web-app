import { render, screen } from "@testing-library/react";
import RecommendedTypesNav from "../recommended-types.component";
import { RecommendedTypes } from "../../(recommended)/page";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("Recommended Types Component", () => {
    it("should call the onRecommendedType callback when the type button is clicked", async () => {
        let currentRecommendedType: RecommendedTypes = "FOLLOWING";
        const onRecommendTypeChange = vi.fn((type: RecommendedTypes) => currentRecommendedType = type);
        
        render(
            <RecommendedTypesNav currentRecommendedType={currentRecommendedType}
                onRecommendTypeChange={onRecommendTypeChange}
            />);

        const followingButton = screen.getByRole("button", { name: "following-button" });
        const forYouButton = screen.getByRole("button", { name: "foryou-button" });

        await userEvent.click(forYouButton);
        expect(onRecommendTypeChange).toHaveBeenCalled();
        expect(currentRecommendedType).toBe("FORYOU");

        await userEvent.click(followingButton);
        expect(onRecommendTypeChange).toHaveBeenCalled();
        expect(currentRecommendedType).toBe("FOLLOWING")
    });
});