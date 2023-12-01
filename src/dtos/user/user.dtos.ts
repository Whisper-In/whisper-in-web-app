export enum ProfileModels {
  AIProfile, UserProfile
}

export interface IUserProfileDto {
  _id: string;
  name?: string;
  userName?: string;
  bio?: string;
  birthday?: Date;
  gender?: string;
  avatar?: string;
  email?: string;
  instagram?: string;
  youtube?: string;
  googleId?: string;
  appleId?: string;
  stripeId?: string;
  isAgreeTnC?: boolean;
  postCount?: number;
  followerCount?: number;
  totalLikeCount?: number;
  priceTiers?: IPriceTierDto[];
  aiDescription?: string;
  isSubscriptionOn?: boolean;
}

export interface IPriceTierDto {
  price: number,
  tier: number,
  features: string[]
}

export interface IProfileSearchDto {
  id: string;
  name: string;
  userName: string;
  avatar: string;
  priceTiers?: IPriceTierDto[];
}