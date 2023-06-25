import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum VoteTypes {
  upvote = 'upvote',
  downvote = 'downvote',
}

export class UpdateVoteDto {
  @IsEnum(VoteTypes)
  @IsNotEmpty()
  type: VoteTypes;

  @IsNumber()
  @IsNotEmpty()
  vote: number;
}
