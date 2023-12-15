import { IProfileDto } from "@/dtos/profile/profile.dtos";
import { IProfileSearchDto } from "@/dtos/user/user.dtos";
import { faker } from "@faker-js/faker";

export const mockProfile: IProfileDto = {
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