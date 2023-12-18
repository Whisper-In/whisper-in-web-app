import "@testing-library/jest-dom";
import "blob-polyfill"
import axios from "axios";
import { vi } from 'vitest';
import "@/app/globals.css";
import { mockElement, mockElements, mockStripe } from "./__mocks__/payment.mocks";
import { faker } from "@faker-js/faker";

axios.defaults.baseURL = window.location.origin;

global.URL.createObjectURL = vi.fn(() => faker.internet.url());

function scrollTo(scroll?: ScrollToOptions): void;
function scrollTo(x: number, y: number): void;
function scrollTo(a?: number | ScrollToOptions, b?: number) {
    if (typeof (a) == "number") {
        Element.prototype.scrollLeft = a;

        if (b) {
            Element.prototype.scrollTop = b;
        }
    }
    else if ((<ScrollToOptions>a).top || (<ScrollToOptions>a).left) {
        a = <ScrollToOptions>a;
        if (a.top) {
            Element.prototype.scrollTop = a.top
        }

        if (a.left) {
            Element.prototype.scrollLeft = a.left
        }
    }
}

Element.prototype.scrollTo = scrollTo;

const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

vi.mock("next/navigation", () => ({
    ...require("next-router-mock")
}))

vi.mock("@stripe/react-stripe-js", async () => {
    const stripe = await vi.importActual<any>("@stripe/react-stripe-js");

    return {
        ...stripe,
        Element: vi.fn(() => mockElement()),
        useStripe: vi.fn(() => mockStripe()),
        useElements: vi.fn(() => mockElements()),
        default: stripe
    }
});

export const playStub = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(async () => { });
export const pauseStub = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(async () => { });