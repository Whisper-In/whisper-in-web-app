import { IPostDto, PostType } from "@/dtos/content/post.dtos";
import { faker } from "@faker-js/faker";
import path from "path";

export const createMockPost = (): IPostDto => ({
    _id: faker.database.mongodbObjectId(),
    postType: PostType[PostType.PHOTO],
    creator: {
        _id: faker.database.mongodbObjectId(),
        isFollowing: false,
        userName: faker.internet.userName(),
        avatar: faker.internet.avatar()
    },
    description: faker.lorem.text(),
    likeCount: faker.number.int({ min: 0, max: 1000 }),
    postURL: faker.internet.url()
});

export const mockPhotoPath = path.resolve(__dirname, "mockPhoto.jpg");