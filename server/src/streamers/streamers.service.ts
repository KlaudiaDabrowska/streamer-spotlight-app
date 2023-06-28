import { Injectable } from '@nestjs/common';
import { VoteTypes } from './dtos/update-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from './streamers.entity';
import { Repository } from 'typeorm';
import { Platform } from './dtos/add-streamer.dto.';
import { StreamerSseService } from './streamers_sse.service';
import { PageOptionsDto } from 'src/shared/dtos/PageMetaDtoParameters';
import { PageDto, PageMetaDto } from 'src/shared/dtos/PageDto';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer) private repo: Repository<Streamer>,
    private streamerSseService: StreamerSseService,
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

  getById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async add(streamerName: string, platform: Platform, description: string) {
    const newStreamer = this.repo.create({
      streamerName,
      platform,
      description,
      upvotes: 0,
      downvotes: 0,
    });

    const savedStreamer = await this.repo.save(newStreamer);
    this.streamerSseService.pushEvent(savedStreamer);
    return savedStreamer;
  }

  async updateVote(id: number, type: VoteTypes) {
    if (type === VoteTypes.upvote) {
      await this.repo.update(id, { upvotes: () => `upvotes + 1` });
    } else if (type === VoteTypes.downvote) {
      await this.repo.update(id, { downvotes: () => `downvotes + 1` });
    } else {
      throw new Error('Unsupported operation');
    }
    const updated = await this.repo.findOneBy({ id: id });
    this.streamerSseService.pushEvent(updated);
  }
}
