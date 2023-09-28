import { IPriceTierDto } from "@/dtos/user/user.dtos";

export type UserProfile = {
    _id: string;
    avatar?: string;
    userName?: string;
    name?: string;
    email?: string;
    bio?: string;
    instagram?: string;
    youtube?: string;
    postCount?: number;
    followerCount?: number;
    totalLikeCount?: number;
    isSubscriptionOn?: boolean;
    priceTiers?: IPriceTierDto[];
    aiDescription?: string;
    stripeConnectedAccountId?: string;
    voiceSampleURL?: string;
}