import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export enum Platform {
  Twitch = 'Twitch',
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  Kick = 'Kick',
  Rumble = 'Rumble',
}

export class AddStreamerDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    message:
      'Streamer name must be at least 3 characters, and max length must be less than 15 characters',
  })
  streamerName: string;

  @IsEnum(Platform)
  @IsNotEmpty()
  platform: Platform;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Description must be at least 10 characters',
  })
  description: string;
}
