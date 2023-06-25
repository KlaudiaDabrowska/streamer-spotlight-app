import { Injectable } from '@nestjs/common';
import { VoteTypes } from './dtos/update-vote.dto';

let streamers = [
  {
    id: 1,
    streamerName: 'pewdiepie',
    platform: 'Twitch',
    description: 'Super streamer',
    upvotes: 34,
    downvotes: 2,
  },
  {
    id: 2,
    streamerName: 'pewdiepie1',
    platform: 'Yt',
    description: 'Super streamer milion',
    upvotes: 2,
    downvotes: 34,
  },
];

@Injectable()
export class StreamersService {
  getAll() {
    return streamers;
  }
  getById(id: number) {
    return streamers.find((streamer) => streamer.id === id);
  }
  add(streamerName: string, platform: string, description) {
    const id = Math.round(Math.random() * 100);
    const newStreamer = {
      id,
      streamerName,
      platform,
      description,
      upvotes: 0,
      downvotes: 0,
    };
    streamers.push(newStreamer);
    return newStreamer;
  }
  updateVote(id: number, type: VoteTypes) {
    const streamer = streamers.find((streamer) => streamer.id === id);

    if (type === VoteTypes.upvote) {
      streamer.upvotes++;
    } else {
      streamer.downvotes++;
    }
  }
}
