export interface IAddStreamer {
  streamerName: string;
  platform: Platform;
  description: string;
}

enum Platform {
  Twitch = 'Twitch',
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  Kick = 'Kick',
  Rumble = 'Rumble',
}
