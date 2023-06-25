import { Injectable } from '@nestjs/common';
import { VoteTypes } from './dtos/update-vote.dto';

let streamers = [
  {
    id: 1,
    streamerName: 'pewdiepie',
    platform: 'Twitch',
    description: 'Super streamer',
    upvote: 34,
    downvote: 2,
  },
  {
    id: 2,
    streamerName: 'pewdiepie1',
    platform: 'Yt',
    description: 'Super streamer milion',
    upvote: 2,
    downvote: 34,
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
      upvote: 0,
      downvote: 0,
    };
    streamers.push(newStreamer);
    return newStreamer;
  }
  updateVote(id: number, type: VoteTypes, vote: number) {
    const streamer = streamers.find((streamer) => streamer.id === id);

    if (type === VoteTypes.upvote) {
      streamer.upvote = vote;
    } else {
      streamer.downvote = vote;
    }
  }
}
