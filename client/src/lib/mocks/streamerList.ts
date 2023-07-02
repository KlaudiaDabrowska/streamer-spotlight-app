import { faker } from "@faker-js/faker";
import { Platform } from "../types/Platforms";
import { IStreamerObject, IStreamersResponse } from "../types/Streamers";

export const generateMockStreamersResponse = (
  page: number = 1,
  items: number = 3,
  total: number = 3
): IStreamersResponse => {
  const data: IStreamerObject[] = Array(items)
    .fill(0)
    .map((_) => {
      return {
        id: faker.string.uuid(),
        streamerName: faker.internet.displayName(),
        platform: faker.helpers.arrayElement([
          Platform.Kick,
          Platform.Rumble,
          Platform.TikTok,
          Platform.Twitch,
          Platform.YouTube,
        ]),
        description: faker.lorem.paragraph(),
        image: faker.image.url(),
        upvotes: faker.number.int({ max: 5000000 }),
        downvotes: faker.number.int({ max: 5000000 }),
      };
    });

  return {
    data: data,
    meta: {
      page: page,
      items: items,
      total: total,
    },
  };
};
