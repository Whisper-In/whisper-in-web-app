import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import PaymentForm from "../payment-form.component";
import { mockProfile } from "../../../../__mocks__/profile.mocks";
import { Elements } from "@stripe/react-stripe-js";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { HttpResponse, delay, http } from "msw";
import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import { mockElements, mockPaymentSheet } from "../../../../__mocks__/payment.mocks";
import { renderWithProviders } from "@/utils/test-utils";

const server = setupServer(
    http.post("/api/user/payment-subscription", async (req) => {
        return HttpResponse.json<ICreatePaymentSheetDto>(mockPaymentSheet)
    })
)

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const onPaymentInitialized = vi.fn();
const onPaymentCompleted = vi.fn();
const onPaymentEnded = vi.fn();
const onPaymentFailed = vi.fn();

describe("Payment Form Component", () => {
    beforeEach(() => {
        renderWithProviders(
            <Elements stripe={new Promise(() => { })}>
                <PaymentForm open={true}
                    profile={mockProfile}
                    onPaymentInitlialized={onPaymentInitialized}
                    onPaymentCompleted={onPaymentCompleted}
                    onPaymentEnded={onPaymentEnded}
                    onPaymentFailed={onPaymentFailed}
                />
            </Elements>
        )
    });

    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    })

    it("should have a disclaimer for test payment", () => {
        const disclaimer = screen.queryByText("Disclaimer", {
            exact: false
        });
        expect(disclaimer).toBeInTheDocument();
    });

    it("should show a loading spinner when submitting", async () => {
        server.use(
            http.post("/api/user/payment-subscription", async (req) => {
                await delay("infinite");
            })
        )

        const submitButton = screen.getByRole("button", { name: "Submit" });
        await userEvent.click(submitButton);

        const loading = screen.getByRole("progressbar", { busy: true });
        expect(loading).toBeInTheDocument();
    });

    it("should disable the submit button when submitting", async () => {
        server.use(
            http.post("/api/user/payment-subscription", async (req) => {
                await delay("infinite");
            })
        )

        const submitButton = screen.getByRole("button", { name: "Submit" });
        await userEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
    });

    it("should call the onPaymentInitialized callback after payment is initialized", async () => {
        const submitButton = screen.getByRole("button", { name: "Submit" });
        await userEvent.click(submitButton);

        await waitFor(() => expect(onPaymentInitialized).toHaveBeenCalled());
    });

    it("should call the onPaymentCompleted callback when payment is confirmed", async () => {
        const submitButton = screen.getByRole("button", { name: "Submit" });
        await userEvent.click(submitButton);

        await waitFor(() => expect(onPaymentCompleted).toHaveBeenCalled());
    });

    it("should call onPaymentEnded callback when payment is submitted", async () => {
        const submitButton = screen.getByRole("button", { name: "Submit" });
        await userEvent.click(submitButton);

        await waitFor(() => expect(onPaymentEnded).toHaveBeenCalled());
    });

    it("should call onPaymentFailed callback if it hits an error when submitting", async () => {
        const stripe = await import("@stripe/react-stripe-js");
        vi.spyOn(stripe, "useElements").mockImplementationOnce(() => ({
            ...mockElements(),
            submit: vi.fn(() => new Promise((resolve, reject) => {
                return resolve({
                    error: {
                        type: "api_error"
                    }
                })
            }))
        }));

        render(
            <Elements stripe={new Promise(() => { })}>
                <PaymentForm open={true}
                    profile={mockProfile}
                    onPaymentInitlialized={onPaymentInitialized}
                    onPaymentCompleted={onPaymentCompleted}
                    onPaymentEnded={onPaymentEnded}
                    onPaymentFailed={onPaymentFailed}
                />
            </Elements>
        )

        const submitButton = screen.getByRole("button", { name: "Submit" });
        await userEvent.click(submitButton);

        await waitFor(() => expect(onPaymentFailed).toHaveBeenCalled());
    });
});