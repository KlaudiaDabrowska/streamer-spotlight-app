import { Test } from '@nestjs/testing';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';

describe('StreamersController', () => {
  let streamersController: StreamersController;
  let streamersService: StreamersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StreamersController],
      providers: [StreamersService],
    }).compile();

    streamersService = moduleRef.get<StreamersService>(StreamersService);
    streamersController =
      moduleRef.get<StreamersController>(StreamersController);
  });

  describe('get all streamers', () => {
    it('should return an array of streamers object', async () => {
      const mockedResult = [
        {
          id: 1,
          streamerName: 'Streamer1',
          platform: 'Twitch',
          description: 'Super streamer',
          upvotes: 34,
          downvotes: 2,
        },
        {
          id: 2,
          streamerName: 'Streamer2',
          platform: 'YouTube',
          description: 'Super streamer2',
          upvotes: 2,
          downvotes: 34,
        },
      ];

      jest
        .spyOn(streamersService, 'getAll')
        .mockImplementation(() => mockedResult);

      expect(await streamersController.getStreamers()).toBe(mockedResult);
    });
  });
});
