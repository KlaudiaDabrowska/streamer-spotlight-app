import { Injectable } from '@nestjs/common';
import { VoteTypes } from './dtos/update-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from './streamers.entity';
import { Repository } from 'typeorm';
import { Platform } from './dtos/add-streamer.dto.';

@Injectable()
export class StreamersService {
  constructor(@InjectRepository(Streamer) private repo: Repository<Streamer>) {}

  getAll() {
    return this.repo.find();
  }

  getById(id: number) {
    return this.repo.findOneBy({ id });
  }

  add(streamerName: string, platform: Platform, description: string) {
    const newStreamer = this.repo.create({
      streamerName,
      platform,
      description,
      upvotes: 0,
      downvotes: 0,
    });

    return this.repo.save(newStreamer);
  }

  async updateVote(id: number, type: VoteTypes) {
    if (type === VoteTypes.upvote) {
      await this.repo.update(id, { upvotes: () => `upvotes + 1` });
    } else if (type === VoteTypes.downvote) {
      await this.repo.update(id, { downvotes: () => `downvotes + 1` });
    } else {
      throw new Error('Unsupported operation');
    }
  }
}
