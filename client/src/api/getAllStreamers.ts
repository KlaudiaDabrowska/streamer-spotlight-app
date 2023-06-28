import { apiClient } from "../config/apiConfig";
import { IStreamersResponse } from "../lib/types/Streamers";

export enum Direction {
  DESC = "DESC",
  ASC = "ASC",
}

export const getAllStreamers = async (
  page: number,
  field: string,
  direction: Direction
) => {
  const response = await apiClient.get<IStreamersResponse>(
    `/streamers?itemsPerPage=10&page=${page}&sortBy=${field}:${direction}`
  );
  return response.data;
};
