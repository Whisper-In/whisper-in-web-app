import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import { faker } from "@faker-js/faker";
import { StripeElements } from "@stripe/stripe-js";
import { vi } from "vitest";

export const mockElement = () => ({
    mount: vi.fn(),
    destroy: vi.fn(),
    on: vi.fn(),
    update: vi.fn()
});

export const mockElements = (): StripeElements => {
    const elements: any = {};

    return {
        update: vi.fn(),
        fetchUpdates: vi.fn(),
        create: vi.fn((type: any) => {
            elements[type] = mockElement();

            return elements[type]
        }),
        getElement: vi.fn((type: any) => {
            return elements[type] || null;
        }),
        submit: vi.fn(() => new Promise((resolve, reject) => {
            return resolve({
                error: undefined
            })
        }))
    }
}

export const mockStripe = () => ({
    elements: vi.fn(() => mockElements()),
    createToken: vi.fn(),
    createSource: vi.fn(),
    confirmPayment: vi.fn((options: any) => { }),
    createPaymentMethod: vi.fn(),
    confirmCardPayment: vi.fn(),
    confirmCardSetup: vi.fn(),
    paymentRequest: vi.fn(),
    _registerWrapper: vi.fn()
})

export const mockPaymentSheet: ICreatePaymentSheetDto = {
    paymentIntent: faker.string.alphanumeric(10),
    ephemeralKey: faker.string.alphanumeric(10),
    publishableKey: faker.string.alphanumeric(20),
    customer: faker.string.alphanumeric(10),
    subscriptionId: faker.string.alphanumeric(10)
}