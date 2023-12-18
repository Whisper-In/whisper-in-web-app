import { IProfileDto } from "@/dtos/profile/profile.dtos";
import { IProfileSearchDto, IUserProfileDto } from "@/dtos/user/user.dtos";
import { faker } from "@faker-js/faker";

export const mockProfile: IProfileDto = {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    userName: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    chatId: faker.database.mongodbObjectId(),
    isSubscriptionOn: true,
    priceTiers: [{
        features: [],
        price: 20,
        tier: 0
    }],
    postCount: faker.number.int(99),
    followerCount: faker.number.int(99),
    totalLikeCount: faker.number.int(99)
}

export const mockUserProfile: IUserProfileDto = {
    _id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    userName: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    priceTiers: [{
        features: [],
        price: 20,
        tier: 0
    }],
    postCount: faker.number.int(99),
    followerCount: faker.number.int(99),
    totalLikeCount: faker.number.int(99)
}


export const mockProfileSearch: IProfileSearchDto = {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    userName: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    priceTiers: [{
        features: [],
        price: 20,
        tier: 0
    }]
}