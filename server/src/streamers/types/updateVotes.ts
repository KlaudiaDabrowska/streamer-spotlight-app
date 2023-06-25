export interface IUpdateVotes {
  type: VoteTypes;
  vote: number;
}

export enum VoteTypes {
  upvote = 'upvote',
  downvote = 'downvote',
}
