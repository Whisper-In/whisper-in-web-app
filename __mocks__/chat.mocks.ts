import { IUserChatDto } from "@/dtos/chats/chats.dtos";
import { faker } from "@faker-js/faker";
import { mockProfile } from "./profile.mocks";

export const createMockChat = (): IUserChatDto => {
    const chatId = faker.database.mongodbObjectId();

    return {
        _id: faker.database.mongodbObjectId(),
        chatId,
        lastMessage: {
            messageId: faker.database.mongodbObjectId(),
            chatId,
            message: faker.lorem.text(),
            sender: mockProfile.id,
            createdAt: faker.date.past().toISOString()
        },
        isAudioOn: false,
        profile: {
            _id: faker.database.mongodbObjectId(),
            isSubscriptionOn: false,
            ...mockProfile
        }
    }
}

export const createUserChats = (count: number): IUserChatDto[] => {
    return Array.from(new Array(count)).map(() => createMockChat());
}