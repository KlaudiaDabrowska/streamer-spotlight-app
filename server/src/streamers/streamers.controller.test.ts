import { Test, TestingModule } from '@nestjs/testing';
import { StreamersService } from './streamers.service';
import { StreamerEventsService } from './streamers_events.service';
import { GenericContainer } from 'testcontainers';
import {
  DataSource,
  DataSourceOptions,
  QueryRunner,
  Repository,
} from 'typeorm';
import { Streamer } from './streamers.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { AddStreamerDto, Platform } from './dtos/add-streamer.dto.';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { VoteType } from './dtos/update-vote.dto';
import { firstValueFrom } from 'rxjs';

describe('Streamers controller', () => {
  let pgContainer;
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let streamerController: StreamersController;

  beforeAll(async () => {
    pgContainer = new GenericContainer('postgres')
      .withEnvironment({ POSTGRES_USER: 'streamer-spotlight' })
      .withEnvironment({ POSTGRES_PASSWORD: 'secret-password' })
      .withEnvironment({ POSTGRES_DB: 'streamer-spotlight-db' })
      .withExposedPorts(5432);

    pgContainer = await pgContainer.start();

    const testconfig: DataSourceOptions = {
      type: 'postgres',
      host: 'localhost',
      port: pgContainer.getMappedPort(5432),
      username: 'streamer-spotlight',
      password: 'secret-password',
      database: 'streamer-spotlight-db',
      entities: [Streamer],
      migrations: ['./src/migrations/migration/*.ts'],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
    const dataSource = new DataSource(testconfig);
    await dataSource.initialize();
    await dataSource.runMigrations();
    await dataSource.synchronize();
    queryRunner = dataSource.createQueryRunner();
    // await dataSource.destroy();

    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...testconfig,
        }),
        TypeOrmModule.forFeature([Streamer]),
      ],
      controllers: [StreamersController],
      providers: [StreamersService, StreamerEventsService],
    }).compile();

    streamerController =
      testingModule.get<StreamersController>(StreamersController);

    app = testingModule.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  }, 10000000);

  beforeEach(async () => {
    await queryRunner.query('DELETE FROM streamer');
  });

  afterAll(async () => {
    await pgContainer.stop();
  });

  it('should add streamer', async () => {
    const createdStreamer = await addStreamer(app);
    expect(createdStreamer).toMatchObject(expectedStreamer);
  });

  it('should get list of streamers', async () => {
    await addStreamer(app);
    return request(app.getHttpServer())
      .get('/streamers')
      .query({
        page: 1,
        itemsPerPage: 2,
        sortBy: 'upvotes:DESC',
      })
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toMatchObject({
          data: [expectedStreamer],
          meta: {},
        });
      });
  });

  it('should return streamer by id', async () => {
    const addedStreamer = await addStreamer(app);

    return request(app.getHttpServer())
      .get(`/streamers/${addedStreamer.id}`)
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toEqual(addedStreamer);
      });
  });

  it('should add upvote', async () => {
    const addedStreamer = await addStreamer(app);

    await request(app.getHttpServer())
      .put(`/streamers/${addedStreamer.id}/vote`)
      .send({ id: addedStreamer.id, type: VoteType.upvote })
      .expect(200);

    const getStreamerById = await request(app.getHttpServer())
      .get(`/streamers/${addedStreamer.id}`)
      .expect(200)
      .then((response) => response.body as Streamer);

    expect(getStreamerById.upvotes).toEqual(addedStreamer.upvotes + 1);
  });

  it('should add downvote', async () => {
    const addedStreamer = await addStreamer(app);
    await request(app.getHttpServer()).subscribe;

    await request(app.getHttpServer())
      .put(`/streamers/${addedStreamer.id}/vote`)
      .send({ id: addedStreamer.id, type: VoteType.downvote })
      .expect(200);

    const getStreamerById = await request(app.getHttpServer())
      .get(`/streamers/${addedStreamer.id}`)
      .expect(200)
      .then((response) => response.body as Streamer);

    expect(getStreamerById.downvotes).toEqual(addedStreamer.downvotes + 1);
  });

  it('should send event when sreamer added', async () => {
    const streamerUpdatedEvent = firstValueFrom(
      streamerController.subscribeToStreamerEvents(),
    );
    const addedStreamer = await addStreamer(app);

    await expect(streamerUpdatedEvent).resolves.toMatchObject({
      data: addedStreamer,
    });
  });

  it('should send events to multiple clients', async () => {
    const firstClientEvent = firstValueFrom(
      streamerController.subscribeToStreamerEvents(),
    );
    const secondClientEvent = firstValueFrom(
      streamerController.subscribeToStreamerEvents(),
    );
    const addedStreamer = await addStreamer(app);

    await expect(firstClientEvent).resolves.toMatchObject({
      data: addedStreamer,
    });
    await expect(secondClientEvent).resolves.toMatchObject({
      data: addedStreamer,
    });
  });

  it('should send event when upvote given', async () => {
    const addedStreamer = await addStreamer(app);

    const streamerUpdatedEvent = firstValueFrom(
      streamerController.subscribeToStreamerEvents(),
    );

    await request(app.getHttpServer())
      .put(`/streamers/${addedStreamer.id}/vote`)
      .send({ id: addedStreamer.id, type: VoteType.upvote })
      .expect(200);

    await expect(streamerUpdatedEvent).resolves.toMatchObject({
      data: { ...addedStreamer, upvotes: addedStreamer.upvotes + 1 },
    });
  });

  it('should send event when downvote given', async () => {
    const addedStreamer = await addStreamer(app);

    const streamerUpdatedEvent = firstValueFrom(
      streamerController.subscribeToStreamerEvents(),
    );

    await request(app.getHttpServer())
      .put(`/streamers/${addedStreamer.id}/vote`)
      .send({ id: addedStreamer.id, type: VoteType.downvote })
      .expect(200);

    await expect(streamerUpdatedEvent).resolves.toMatchObject({
      data: { ...addedStreamer, downvotes: addedStreamer.downvotes + 1 },
    });
  });
});

const expectedStreamer = {
  streamerName: 'test-streamer',
  platform: Platform.Twitch,
  description: 'test-streamer-description',
  image:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
  upvotes: 0,
  downvotes: 0,
};

const addStreamer = (
  app: INestApplication,
  addStreamerRequest: AddStreamerDto = {
    streamerName: 'test-streamer',
    platform: Platform.Twitch,
    description: 'test-streamer-description',
  },
) => {
  return request(app.getHttpServer())
    .post('/streamers')
    .send(addStreamerRequest)
    .expect(201)
    .then((response) => response.body as Streamer);
};
