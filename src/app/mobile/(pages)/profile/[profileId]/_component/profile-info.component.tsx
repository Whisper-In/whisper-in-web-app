"use client"

import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscribeButton from "./subscribe-button.component";
import StatItem from "./stat-item.component";
import { IProfileDto } from "@/dtos/profile/profile.dtos";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import * as profileClientService from "@/app/_client-services/profile/profile.client-service";
import { useEffect, useState } from "react";
import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import { Avatar, CircularProgress, Drawer, Modal } from "@mui/material";
import PaymentForm from "@/app/mobile/_components/payment-form.component";
import * as chatClientService from "@/app/_client-services/chat/chat.client-service";
import * as userClientService from "@/app/_client-services/user/user.client-service";
import { fetchChats } from "@/store/thunks/chats.thunks";
import { useAlertPrompt } from "@/components/alert-prompt.component";
import { useRouter } from "next/navigation";
import { useSpinner } from "@/components/spinner.component";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function ProfileInfo({ profile }
    : { profile: IProfileDto }) {
    const [_profile, setProfile] = useState(profile);
    const me = useAppSelector((state) => state.user.me)!;
    const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
    const { isShowingSpinner, showSpinner } = useSpinner();
    const dispatch = useAppDispatch();
    const { promptAlert } = useAlertPrompt();
    const router = useRouter();

    const priceTier = profile.priceTiers.length ? profile.priceTiers[0] : null;

    const onPaymentInitlialized = async (paymentSheetResult: ICreatePaymentSheetDto) => {
        try {
            await userClientService.createUserSubscription(profile.id, priceTier?.tier, paymentSheetResult.subscriptionId);
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

            const { chatId } = await chatClientService.createNewChat(profile.id);

            const navigateToChat = () => router.push(`/chat/${chatId}`);

            promptAlert({
                title: "Success",
                message: `You have successfully subscribed to ${profile?.name}`,
                onOk: navigateToChat,
                onClose: navigateToChat
            });

            _profile.isSubscribed = true;
            setProfile({ ..._profile });

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
                    const deletedSubscription = await userClientService.cancelPaymentSubscription(profile!.id);

                    _profile.isSubscribed = false;
                    setProfile({ ..._profile })
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
        if (_profile.isSubscribed) {
            cancelSubscription();
        } else {
            startSubscription();
        }
    }

    const startSubscription = async () => {
        if (_profile.isSubscriptionOn) {
            setIsPaymentFormOpen(true);
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
                <Avatar src={_profile.avatar} sx={{ width: 96, height: 96 }} />

                <div className="text-lg italic">
                    @{_profile.userName}
                </div>
                <div className="flex justify-center gap-12 mb-3">
                    <StatItem label="Posts" value={_profile.postCount ?? 0} />
                    <StatItem label="Followers" value={_profile.followerCount ?? 0} />
                    <StatItem label="Likes" value={_profile.totalLikeCount ?? 0} />
                </div>

                {
                    me?._id != profile.id && profile.isSubscriptionOn &&
                    <SubscribeButton disabled={isShowingSpinner} profile={_profile} onClick={onSubscribeClick} />
                }
            </div>

            <PaymentForm
                open={isPaymentFormOpen}
                profile={_profile}
                onClose={onPaymentClose}
                onPaymentInitlialized={onPaymentInitlialized}
                onPaymentCompleted={onPaymentCompleted}
                onPaymentFailed={onPaymentFailed}
                onPaymentEnded={onPaymentClose} />
        </Elements>
    )
}