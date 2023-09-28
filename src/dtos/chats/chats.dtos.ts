export enum ChatFeature {
    AUDIO
}

export interface IUserChatProfileDto {
    _id: string;
    name: string;    
    avatar?: string;
    isBlocked?: boolean;
}

export interface IUserChatRawDto {
    chatId: string;
    features: string[],
    profiles: IUserChatProfileDto[]
}

export interface IUserChatDto {
    chatId: string;
    features: ChatFeature[],
    profiles: IUserChatProfileDto[]
}
export interface IUserChatMessageDto {
    message: string;
    sender: string;
    isAudio?:boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
