import { BadRequestException, Injectable } from '@nestjs/common';
import { VoteType } from './dtos/update-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from './streamers.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Platform } from './dtos/add-streamer.dto.';
import { StreamerEventsService } from './streamers_events.service';
import { PageOptionsDto } from '../shared/dtos/PageMetaDtoParameters';
import { PageMetaDto, PageDto } from '../shared/dtos/PageDto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer) private repo: Repository<Streamer>,
    private streamerEventsService: StreamerEventsService,
  ) {}

  getAll(pageOptions: PageOptionsDto) {
    const query = this.repo
      .createQueryBuilder('streamers')
      .skip(pageOptions.skip)
      .take(pageOptions.itemsPerPage);

    //todo: Check if sort key can be applied
    pageOptions.sortBy.forEach((sortBy) => {
      query.addOrderBy(sortBy.field, sortBy.direction);
    });

    return query
      .getManyAndCount()
      .then(
        ([streamers, total]) =>
          new PageDto(streamers, new PageMetaDto(pageOptions, total)),
      );
  }

  getById(id: string) {
    return this.repo.findOneBy({ id });
  }

  async add(
    streamerName: string,
    platform: Platform,
    description: string,
    imageUrl: string,
  ) {
    try {
      const savedStreamer = await this.repo.save({
        id: uuidv4(),
        streamerName,
        platform,
        description,
        image: imageUrl,
        upvotes: 0,
        downvotes: 0,
      });
      this.streamerEventsService.pushEvent(savedStreamer);
      return savedStreamer;
    } catch (err) {
      //@ts-expect-error the code is not declared in types but because of conditional chaining the code should be safe
      //PSQL error codes: https://www.postgresql.org/docs/10/errcodes-appendix.html
      if (err instanceof QueryFailedError && err?.code === '23505') {
        throw new BadRequestException('Given streamer already exists');
      }
      throw err;
    }
  }

  async updateVote(id: string, type: VoteType) {
    if (type === VoteType.upvote) {
      await this.repo.update(id, { upvotes: () => `upvotes + 1` });
    } else if (type === VoteType.downvote) {
      await this.repo.update(id, { downvotes: () => `downvotes + 1` });
    } else {
      throw new Error('Unsupported operation');
    }
    //typeorm does not support custom queries in save function so instead of implementing
    //optimistic / pessimistic locking I decided to fetch the record after updating
    const updated = await this.repo.findOneBy({ id: id });
    this.streamerEventsService.pushEvent(updated);
  }
}
