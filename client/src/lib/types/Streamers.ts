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
  id: string;
  streamerName: string;
  platform: Platform;
  description: string;
  image: string;
  upvotes: number;
  downvotes: number;
}

interface IMetaOptions {
  page: number;
  items: number;
  total: number;
}
