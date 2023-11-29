"use client"

import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscribeButton from "./subscribe-button.component";
import StatItem from "./stat-item.component";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import { Avatar, CircularProgress, Drawer, Modal } from "@mui/material";
import PaymentForm from "@/app/_components/payment-form.component";
import * as chatClientService from "@/store/services/chat/chat.service";
import * as userClientService from "@/store/services/user/user.service";
import { fetchChats } from "@/store/thunks/chats.thunks";
import { useAlertPrompt } from "@/app/_components/alert-prompt.component";
import { useRouter } from "next/navigation";
import { useSpinner } from "@/app/_components/spinner.component";
import { useGetProfile } from "@/store/hooks/profile.hooks";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function ProfileInfo({ profileId }
    : { profileId: string }) {
    const { data: profile, isLoading, mutate: updateProfile } = useGetProfile(profileId);
    const me = useAppSelector((state) => state.user.me)!;
    const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
    const { isShowingSpinner, showSpinner } = useSpinner();
    const dispatch = useAppDispatch();
    const { promptAlert } = useAlertPrompt();
    const router = useRouter();

    const priceTier = profile?.priceTiers?.length ? profile?.priceTiers[0] : null;

    const onPaymentInitlialized = async (paymentSheetResult?: ICreatePaymentSheetDto) => {
        try {
            await userClientService.createUserSubscription(profile!.id, priceTier?.tier, paymentSheetResult?.subscriptionId);
        } catch (error) {
            throw error;
        }
    }

    const onPaymentCompleted = () => {
        onSubscribed();
    }

    const onPaymentFailed = (error: string) => {
        promptAlert({
            title: "Oops",
            message: "Payment failed. Please try again."
        });
    }

    const onPaymentClose = () => {
        setIsPaymentFormOpen(false);
    }

    const onSubscribed = async () => {
        try {
            showSpinner(true);

            const { chatId } = await chatClientService.createNewChat(profile!.id);

            const navigateToChat = () => router.push(`/chat/${chatId}`);

            promptAlert({
                title: "Success",
                message: `You have successfully subscribed to ${profile?.name}`,
                onOk: navigateToChat,
                onClose: navigateToChat
            });

            updateProfile();

            dispatch(fetchChats());
        } catch (error) {
            promptAlert({
                title: "Opps",
                message: "Subscription failed. Please try again."
            })
        } finally {
            showSpinner(false);
        }
    }

    const cancelSubscription = async () => {
        const onOk = async () => {
            if (profile?.isSubscribed) {
                showSpinner(true);
                try {
                    await userClientService.cancelPaymentSubscription(profile!.id);

                    updateProfile();
                } catch (error) {
                    console.log(error);
                } finally {
                    showSpinner(false);
                }
            }
        }

        promptAlert({
            title: "Unsubscribe",
            message: `Are you sure you want to unsubscribe?`,
            okText: "Yes",
            onOk,
            showCancel: true,
            cancelText: "No",
        });
    }

    const onSubscribeClick = () => {
        if (profile?.isSubscribed) {
            cancelSubscription();
        } else {
            startSubscription();
        }
    }

    const startSubscription = async () => {
        if (profile?.isSubscriptionOn) {
            if ((priceTier?.price ?? 0) > 0) {
                setIsPaymentFormOpen(true);
            } else {
                await onPaymentInitlialized();
                await onPaymentCompleted();
            }
        }
    }

    return (
        <Elements stripe={stripePromise} options={{
            mode: "subscription",
            amount: (priceTier?.price ?? 0) * 100,
            currency: "usd",
            setup_future_usage: "off_session"
        }}>
            <div className="flex flex-col items-center gap-3 pt-14 px-5 mb-3">
                <Avatar src={profile?.avatar} sx={{ width: 96, height: 96 }} />

                <div className="text-lg italic">
                    @{profile?.userName}
                </div>
                <div className="flex justify-center gap-12 mb-3">
                    <StatItem label="Posts" value={profile?.postCount ?? 0} />
                    <StatItem label="Followers" value={profile?.followerCount ?? 0} />
                    <StatItem label="Likes" value={profile?.totalLikeCount ?? 0} />
                </div>

                {
                    me?._id != profile?.id && profile?.isSubscriptionOn &&
                    <SubscribeButton disabled={isShowingSpinner} profile={profile} onClick={onSubscribeClick} />
                }
            </div>

            {
                profile &&
                <PaymentForm
                    open={isPaymentFormOpen}
                    profile={profile}
                    onClose={onPaymentClose}
                    onPaymentInitlialized={onPaymentInitlialized}
                    onPaymentCompleted={onPaymentCompleted}
                    onPaymentFailed={onPaymentFailed}
                    onPaymentEnded={onPaymentClose} />
            }
        </Elements>
    )
}