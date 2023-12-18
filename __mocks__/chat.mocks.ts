import { IUserChatDto, IUserChatMessagesResultDto } from "@/dtos/chats/chats.dtos";
import { faker } from "@faker-js/faker";
import { mockProfile } from "./profile.mocks";
import { ChatMessage } from "@/store/states/chats.states";

export const createMockChat = (): IUserChatDto => {
    const chatId = faker.database.mongodbObjectId();

    return {
        _id: faker.database.mongodbObjectId(),
        chatId,
        lastMessage: {
            messageId: faker.database.mongodbObjectId(),
            chatId,
            message: faker.string.alphanumeric(10),
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

export const mockChatMessage: ChatMessage = {
    message: faker.lorem.text(),
    sender: faker.database.mongodbObjectId(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
}

const totalMessages = 30;
const chatId = faker.database.mongodbObjectId();
const sampleDates = ["2023-01-01", "2023-02-02", "2023-03-03"]
export const mockChatMessageList: IUserChatMessagesResultDto = {
    chatId,
    totalMessages,
    messages: Array.from(Array(totalMessages).keys())
        .map((idx) => {
            const timeString = faker.date.past().toLocaleTimeString("en-GB");
            const createdAt = new Date(`${sampleDates[Math.floor(idx / 10)]}T${timeString}`).toISOString();

            return {
                chatId,
                messageId: faker.database.mongodbObjectId(),
                message: faker.lorem.text(),
                sender: faker.database.mongodbObjectId(),
                createdAt,
                updatedAt: createdAt,
                isSender: idx % 2 == 0
            }
        }).sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
}