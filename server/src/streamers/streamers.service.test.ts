import { Test } from '@nestjs/testing';
import { StreamersService } from './streamers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Streamer } from './streamers.entity';
import { QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { Platform } from './dtos/add-streamer.dto.';
import { StreamerEventsService } from './streamers_events.service';
import { v4 as uuidv4 } from 'uuid';
import { copyOmmiting } from '../shared/copyObjectOmmiting';
import { firstValueFrom } from 'rxjs';
import { BadRequestException } from '@nestjs/common';
import { VoteTypes } from './dtos/update-vote.dto';
import { SortBy } from '../shared/dtos/PageMetaDtoParameters';

describe('StreamersService', () => {
  let streamersService: StreamersService;
  let streamersRepository: Repository<Streamer>;
  let streamerEventsService: StreamerEventsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StreamersService,
        StreamerEventsService,
        {
          provide: getRepositoryToken(Streamer),
          useClass: Repository,
        },
      ],
    }).compile();

    streamersService = module.get<StreamersService>(StreamersService);
    streamerEventsService = module.get<StreamerEventsService>(
      StreamerEventsService,
    );
    streamersRepository = module.get<Repository<Streamer>>(
      getRepositoryToken(Streamer),
    );
  });

  it('should create new streamer and emit streamer updated event', async () => {
    const createdStreamer = {
      id: uuidv4(),
      streamerName: 'test-streamer',
      platform: Platform.Twitch,
      description: 'test-streamer-description',
      image: 'http://images/streamer.png',
      upvotes: 0,
      downvotes: 0,
    };

    const repositorySaveMock = jest
      .spyOn(streamersRepository, 'save')
      .mockResolvedValueOnce(createdStreamer);

    const streamerUpdatedEvent = firstValueFrom(
      streamerEventsService.subscribe(),
    );

    const result = await streamersService.add(
      'test-streamer',
      Platform.Twitch,
      'test-streamer-description',
      'http://images/streamer.png',
    );

    expect(repositorySaveMock).toBeCalledTimes(1);
    expect(repositorySaveMock).toBeCalledWith(
      expect.objectContaining(copyOmmiting(createdStreamer, 'id')),
    );

    expect(result).toEqual(createdStreamer);

    await expect(streamerUpdatedEvent).resolves.toMatchObject({
      data: copyOmmiting(createdStreamer, 'id'),
    });
  });

  it('should throw BadRequestException when streamer already exists', async () => {
    jest
      .spyOn(streamersRepository, 'save')
      .mockRejectedValueOnce(
        new QueryFailedError('INSERT ...', [], { code: '23505' }),
      );

    expect(
      streamersService.add(
        'test-streamer',
        Platform.Twitch,
        'test-streamer-description',
        'http://images/streamer.png',
      ),
    ).rejects.toEqual(new BadRequestException('Given streamer already exists'));
  });

  it('should return streamer by id', async () => {
    const id = uuidv4();

    const streamer = {
      id,
      streamerName: 'test-streamer',
      platform: Platform.Twitch,
      description: 'test-streamer-description',
      image: 'http://images/streamer.png',
      upvotes: 0,
      downvotes: 0,
    };

    const repositoryFindByOneMock = jest
      .spyOn(streamersRepository, 'findOneBy')
      .mockResolvedValueOnce(streamer);

    const result = await streamersService.getById(id);

    expect(repositoryFindByOneMock).toBeCalledTimes(1);
    expect(repositoryFindByOneMock).toBeCalledWith({ id });

    expect(result).toEqual(streamer);
  });

  it('should add upvote', async () => {
    const id = uuidv4();

    const streamer = {
      id,
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

    const repositoryUpdateMock = jest
      .spyOn(streamersRepository, 'update')
      .mockResolvedValue(new UpdateResult());

    const repositoryFindByOneMock = jest
      .spyOn(streamersRepository, 'findOneBy')
      .mockResolvedValue(streamer);

    await streamersService.updateVote(id, VoteTypes.upvote);

    const updateArguments = repositoryUpdateMock.mock.calls[0];
    expect(updateArguments[0]).toEqual(id);
    expect((updateArguments[1].upvotes as () => string)()).toEqual(
      'upvotes + 1',
    );

    expect(repositoryFindByOneMock).toBeCalledTimes(1);
    expect(repositoryFindByOneMock).toBeCalledWith({ id });

    await expect(streamerUpdatedEvent).resolves.toMatchObject({
      data: streamer,
    });
  });

  it('should be add downvote', async () => {
    const id = uuidv4();

    const streamer = {
      id,
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

    const repositoryUpdateMock = jest
      .spyOn(streamersRepository, 'update')
      .mockResolvedValue(new UpdateResult());

    const repositoryFindByOneMock = jest
      .spyOn(streamersRepository, 'findOneBy')
      .mockResolvedValue(streamer);

    await streamersService.updateVote(id, VoteTypes.downvote);

    const updateArguments = repositoryUpdateMock.mock.calls[0];
    expect(updateArguments[0]).toEqual(id);
    expect((updateArguments[1].downvotes as () => string)()).toEqual(
      'downvotes + 1',
    );

    expect(repositoryFindByOneMock).toBeCalledTimes(1);
    expect(repositoryFindByOneMock).toBeCalledWith({ id });

    await expect(streamerUpdatedEvent).resolves.toMatchObject({
      data: streamer,
    });
  });

  it('should return list of streamers', async () => {
    const streamersList = {
      data: [
        {
          id: uuidv4(),
          streamerName: 'test-streamer',
          platform: Platform.Twitch,
          description: 'test-streamer-description',
          image: 'http://images/streamer.png',
          upvotes: 6,
          downvotes: 0,
        },
        {
          id: uuidv4(),
          streamerName: 'test-streamer1',
          platform: Platform.Kick,
          description: 'test-streamer-description1',
          image: 'http://images/streamer.png',
          upvotes: 4,
          downvotes: 0,
        },
      ],
      meta: {
        page: 1,
        items: 2,
        total: 2,
      },
    };

    const createQueryBuilder = {
      skip: jest.fn().mockImplementation(() => {
        return createQueryBuilder;
      }),
      take: jest.fn().mockImplementation(() => {
        return createQueryBuilder;
      }),
      addOrderBy: jest.fn().mockImplementation(() => {
        return createQueryBuilder;
      }),
      getManyAndCount: jest.fn().mockImplementationOnce(() => {
        return Promise.resolve([streamersList.data, 2]);
      }),
    };

    const repositoryGetMock = jest
      .spyOn(streamersRepository, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    const result = await streamersService.getAll({
      page: 1,
      itemsPerPage: 2,
      sortBy: [new SortBy('upvotes', 'DESC')],
      skip: 1,
    });

    expect(repositoryGetMock).toBeCalledTimes(1);
    expect(result).toEqual(streamersList);
  });
});
