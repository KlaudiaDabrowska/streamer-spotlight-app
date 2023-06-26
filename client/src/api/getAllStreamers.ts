import { apiClient } from "../config/apiConfig";
import { IStreamerObject } from "../lib/types/Streamers";

export const getAllStreamers = async () => {
  const response = await apiClient.get<IStreamerObject[]>("/streamers");
  return response.data;
};
