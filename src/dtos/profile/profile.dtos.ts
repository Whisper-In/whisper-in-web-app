import { IPriceTierDto } from "../user/user.dtos";

export interface IProfileDto {
    id: string;
    name: string;
    aboutMe?: string;
    email?: string;
    userName: string;
    avatar?: string;
    priceTiers: IPriceTierDto[];
    isSubscriptionOn?: boolean;
    isSubscribed?: boolean;
    isSubscriptionExpired?: boolean;
    isBlocked?: boolean;
    postCount?: number;
    followerCount?: number;
    totalLikeCount?: number;
}

export interface IProfileSearchDto {
    id: string;
    name: string;
    userName: string;
    avatar: string;
    priceTiers?: IPriceTierDto[];
}