import { IsEnum, IsNotEmpty } from 'class-validator';

export enum VoteType {
  upvote = 'upvote',
  downvote = 'downvote',
}

export class UpdateVoteDto {
  @IsEnum(VoteType)
  @IsNotEmpty()
  type: VoteType;
}
