export enum PostType {
    VIDEO, PHOTO
}

export interface ICreatorProfileDto {
    _id: string;
    userName: string;
    avatar?: string;
    isFollowing: boolean;
}

export interface IPostDto {
    _id: string;
    postURL: string;
    thumbnailURL?: string;
    postType: string;
    description: string;
    creator: ICreatorProfileDto;
    isCreator?: boolean;
    creatorModel: string;
    likeCount: number;
    isLiked?: boolean;
}

export interface IDeletedResultDto {
    acknowledged: boolean;
    deletedCount: number;
}