import { apiClient } from "../config/apiConfig";
import { IStreamersResponse } from "../lib/types/Streamers";

export const getAllStreamers = async (page: number) => {
  const response = await apiClient.get<IStreamersResponse>(
    `/streamers?itemsPerPage=10&page=${page}`
  );
  return response.data;
};
