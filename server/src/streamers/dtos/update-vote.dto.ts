import { IsEnum, IsNotEmpty } from 'class-validator';

export enum VoteTypes {
  upvote = 'upvote',
  downvote = 'downvote',
}

export class UpdateVoteDto {
  @IsEnum(VoteTypes)
  @IsNotEmpty()
  type: VoteTypes;
}
