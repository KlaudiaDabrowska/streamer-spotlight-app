import { StreamerEventsService } from './streamers_events.service';
import { Test } from '@nestjs/testing';
import { Platform } from './dtos/add-streamer.dto.';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';

describe('StreamersService', () => {
  let streamerEventsService: StreamerEventsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [StreamerEventsService],
    }).compile();

    streamerEventsService = module.get<StreamerEventsService>(
      StreamerEventsService,
    );
  });

  it('should emit streamer updated event', async () => {
    const streamerEvent = {
      id: uuidv4(),
      streamerName: 'test-streamer',
      platform: Platform.Twitch,
      description: 'test-streamer-description',
      image: 'http://images/streamer.png',
      upvotes: 0,
      downvotes: 0,
    };

    const streamerUpdatedEvent = firstValueFrom(
      streamerEventsService.subscribe(),
    );

    streamerEventsService.pushEvent(streamerEvent);

    await expect(streamerUpdatedEvent).resolves.toEqual({
      data: streamerEvent,
    });
  });
});
