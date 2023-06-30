import { apiClient } from "../config/apiConfig";
import { IStreamerObject } from "../lib/types/Streamers";

export const getStreamerById = async (id: string) => {
  const response = await apiClient.get<IStreamerObject>(`/streamers/${id}`);
  return response.data;
};
