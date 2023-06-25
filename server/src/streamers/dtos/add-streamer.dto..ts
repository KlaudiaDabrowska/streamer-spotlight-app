import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Platform {
  Twitch = 'Twitch',
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  Kick = 'Kick',
  Rumble = 'Rumble',
}

export class AddStreamerDto {
  @IsString()
  @IsNotEmpty()
  streamerName: string;

  @IsEnum(Platform)
  @IsNotEmpty()
  platform: Platform;

  @IsString()
  @IsNotEmpty()
  description: string;
}
