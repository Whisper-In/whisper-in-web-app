import { IProfileDto } from "@/dtos/profile/profile.dtos";
import { faker } from "@faker-js/faker";

export const mockProfile: IProfileDto = {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    userName: faker.internet.userName(),
    priceTiers: [{
        features: [],
        price: 20,
        tier: 0
    }]
}