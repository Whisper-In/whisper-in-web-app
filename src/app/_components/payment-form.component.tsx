"use client"

import { CircularProgress, Drawer, Link, Stack, Typography } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import * as userClientService from "@/store/services/user/user.service";
import { IProfileDto } from "@/dtos/profile/profile.dtos";
import { useEffect, useState } from "react";

export default function PaymentForm({
    open,
    profile,
    onClose,
    onPaymentInitlialized,
    onPaymentCompleted,
    onPaymentFailed,
    onPaymentEnded
}: {
    open: boolean,
    profile: IProfileDto,
    onClose?: () => void;
    onPaymentInitlialized?: (paymentSheetResult: ICreatePaymentSheetDto) => void,
    onPaymentCompleted?: () => void,
    onPaymentFailed?: (error: string) => void,
    onPaymentEnded?: () => void
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const priceTier = profile.priceTiers?.length ? profile.priceTiers[0] : undefined;

    const initializePaymentSheetResult = async () => {
        try {
            const paymentSheetResult = await userClientService.createPaymentSubscription(profile.id, priceTier?.tier);

            return paymentSheetResult;
        } catch (error) {
            throw error;
        }
    }

    const confirmPayment = async (paymentSheetResult: ICreatePaymentSheetDto) => {
        if (!elements) {
            return null;
        }

        try {
            await stripe?.confirmPayment({
                elements,
                redirect: "if_required",
                clientSecret: paymentSheetResult.paymentIntent,
                confirmParams: {
                    save_payment_method: true,
                    return_url: window.location.href,
                }
            });
        } catch (error) {
            alert(error)
            throw error;
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (isSubmitting) {
            return;
        }

        if (!stripe || !elements) {
            return null;
        }

        try {
            setIsSubmitting(true);

            event.preventDefault();
            
            const submitResult = await elements!.submit();
            
            if (submitResult.error) {                
                throw "Failed to submit payment.";
            }

            const paymentSheetResult = await initializePaymentSheetResult();

            if (onPaymentInitlialized) {
                onPaymentInitlialized(paymentSheetResult)
            }

            await confirmPayment(paymentSheetResult);

            if (onPaymentCompleted) {
                onPaymentCompleted();
            }
        } catch (error) {            
            if (onPaymentFailed) {
                onPaymentFailed(error as any);
            }
        } finally {
            if (onPaymentEnded) {
                onPaymentEnded();
            }

            setIsSubmitting(false);
        }
    }

    return (
        <Drawer open={open} anchor="bottom" onClose={onClose}>
            {
                isSubmitting &&
                <div className="absolute w-full h-full flex justify-center items-center bg-black/20 z-10">
                    <CircularProgress aria-busy={true} />
                </div>
            }
            <form onSubmit={onSubmit} className="p-5">
                <Stack spacing={1}>
                    <Typography fontStyle="italic">
                        <b>Disclaimer:</b> This is a test payment. Please use the test cards listed on <Link href="https://stripe.com/docs/testing" target="_blank">Stripe</Link>. For example, Card No.: 4242 4242 4242 4242, Expiration: 01/28, CVC: 123.
                    </Typography>

                    <PaymentElement />

                    <button type="submit" disabled={isSubmitting}
                        className="rounded-full bg-primary p-3 text-onPrimary w-full">
                        Submit
                    </button>
                </Stack>
            </form>
        </Drawer>
    );
}