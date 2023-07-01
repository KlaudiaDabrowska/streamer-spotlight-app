import { faker } from "@faker-js/faker";
import { IStreamerObject, IStreamersResponse } from "../lib/types/Streamers";
import { Platform } from "../lib/types/Platforms";

export const generateMockStreamersResponse = (
  page: number = 1,
  items: number = 3,
  total: number = 3
): IStreamersResponse => {
  const data: IStreamerObject[] = [
    ...Array(items).map((_) => {
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
    }),
  ];

  return {
    data: data,
    meta: {
      page: page,
      items: items,
      total: total,
    },
  };
};
