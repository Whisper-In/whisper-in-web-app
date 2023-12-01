"use client"

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscribeButton from "./subscribe-button.component";
import StatItem from "./stat-item.component";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";
import { Avatar, Collapse, IconButton, Stack } from "@mui/material";
import PaymentForm from "@/app/_components/payment-form.component";
import * as chatClientService from "@/store/services/chat/chat.service";
import * as userClientService from "@/store/services/user/user.service";
import { fetchChats } from "@/store/thunks/chats.thunks";
import { useAlertPrompt } from "@/app/_components/alert-prompt.component";
import { notFound, useRouter } from "next/navigation";
import { useSpinner } from "@/app/_components/spinner.component";
import { useGetProfile } from "@/store/hooks/profile.hooks";
import { Chat } from "@mui/icons-material";
import FollowButton from "./follow-button.component";
import { useScrollVertical } from "@/hooks/scroll.hook";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function ProfileInfo({
    profileId
}: {
    profileId: string
}) {
    const { data: profile, isLoading, mutate: updateProfile } = useGetProfile(profileId);
    const scrollDirection = useScrollVertical();

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

    const followUser = () => {
        showSpinner(true);
        userClientService.followUser(profileId).then(() => {
            updateProfile();
        }).catch(() => {
            promptAlert({
                title: "Unable to Follow User",
                message: "Oops, failed to follow User. Please try again later."
            });
        }).finally(() => {
            showSpinner(false);
        });
    }

    const unfollowUser = () => {
        showSpinner(true);

        userClientService.unfollowUser(profileId).then(() => {
            updateProfile();
        }).catch(() => {
            promptAlert({
                title: "Unable to Unfollow User",
                message: "Oops, failed to unfollow User. Please try again later."
            });
        }).finally(() => {
            showSpinner(false);
        });
    }

    const onFollowClick = () => {
        if (profile?.isFollowing) {
            unfollowUser();
        } else {
            followUser();
        }
    }

    const onMessageClick = async () => {
        if (profile) {
            if (!profile.chatId) {
                try {
                    showSpinner(true);
                    const { chatId } = await chatClientService.createNewChat(profileId);
                    profile.chatId = chatId;
                } catch (error) {
                    promptAlert({
                        title: "Chat Failed",
                        message: "Unable to chat now. Please try again."
                    })

                    return;
                } finally {
                    showSpinner(false);
                }
            }

            router.push(`/chat/${profile.chatId}`);
        }
    }

    useEffect(() => {
        showSpinner(isLoading)

        if (!isLoading && !profile) {
            promptAlert({
                title: "Failed to Load Profile",
                message: "Unable to load profile",
                onClose: () => router.replace("/")
            });

            return notFound();
        }
    }, [isLoading])

    return (
        <Collapse in={scrollDirection != "DOWN"}>
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

                    <Stack direction="row"
                        spacing={1}
                        width="100%">
                        <FollowButton fullWidth
                            disabled={isShowingSpinner}
                            profile={profile}
                            onClick={onFollowClick} />

                        {
                            !profile?.isMe && profile?.isSubscriptionOn &&
                            <SubscribeButton fullWidth disabled={isShowingSpinner} profile={profile} onClick={onSubscribeClick} />
                        }

                        <IconButton color="secondary" onClick={onMessageClick}>
                            <Chat />
                        </IconButton>
                    </Stack>
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
        </Collapse>
    )
}