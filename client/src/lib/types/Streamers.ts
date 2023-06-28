import { Platform } from "./Platforms";

export interface INewStreamer {
  streamerName: string;
  platform: Platform;
  description: string;
}

export interface IStreamersResponse {
  data: IStreamerObject[];
  meta: IMetaOptions;
}

export interface IStreamerObject {
  id: number;
  streamerName: string;
  platform: Platform;
  description: string;
  upvotes: number;
  downvotes: number;
}

interface IMetaOptions {
  page: number;
  items: number;
  total: number;
}
