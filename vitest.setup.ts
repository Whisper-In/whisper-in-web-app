import "@testing-library/jest-dom";
import "blob-polyfill"
import axios from "axios";
import { vi } from 'vitest';
import "@/app/globals.css";
import { mockElement, mockElements, mockStripe } from "./__mocks__/payment.mocks";
import { faker } from "@faker-js/faker";
import "./__mocks__/html.mocks";

axios.defaults.baseURL = window.location.origin;

global.URL.createObjectURL = vi.fn(() => faker.internet.url());



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