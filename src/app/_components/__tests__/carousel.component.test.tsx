import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Carousel from "../carousel.component";
import { mockPhotoPath } from "../../../../__mocks__/post.mocks";

describe("Carousel", () => {
    it("should call onScrollEnd callback when it react the end", async () => {
        const onScrollEnd = vi.fn();

        render(<Carousel onSrollEnd={onScrollEnd}>{[<img key="test" src={mockPhotoPath} />]}</Carousel>);

        const carousel = screen.getByLabelText("carousel");
        expect(onScrollEnd).not.toHaveBeenCalled();
        fireEvent.scroll(carousel, {
            scrollY: 9999
        });
        expect(onScrollEnd).toHaveBeenCalledTimes(1);

    });
});