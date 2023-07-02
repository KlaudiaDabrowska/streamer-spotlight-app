import { apiClient } from "../config/apiConfig";
import { IStreamersResponse } from "../lib/types/Streamers";

export enum Direction {
  DESC = "DESC",
  ASC = "ASC",
}

export const getAllStreamers = async (
  page: number,
  sortField: string,
  sortDirection: Direction
) => {
  const response = await apiClient.get<IStreamersResponse>(
    `/streamers?itemsPerPage=10&page=${page}&sortBy=${sortField}:${sortDirection}`
  );
  return response.data;
};
