import "@testing-library/jest-dom";
import axios from "axios";
import { vi } from 'vitest';
import "@/app/globals.css"

axios.defaults.baseURL = window.location.origin;

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


export const playStub = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(async () => { });
export const pauseStub = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(async () => { });