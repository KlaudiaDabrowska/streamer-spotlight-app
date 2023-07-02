import { apiClient } from "../config/apiConfig";
import { INewStreamer, IStreamerObject } from "../lib/types/Streamers";

export const createNewStreamer = async (newStreamer: INewStreamer) => {
  const response = await apiClient.post<IStreamerObject>(
    "/streamers",
    newStreamer
  );
  return response.data;
};
