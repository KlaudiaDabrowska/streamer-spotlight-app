import { apiClient } from "../config/apiConfig";

export enum VoteType {
  upvote = "upvote",
  downvote = "downvote",
}

export interface IUpdateVote {
  type: VoteType;
}

export const updateStreamerVote = async (type: IUpdateVote, id?: string) => {
  const response = await apiClient.put(`/streamers/${id}/vote`, type);
  return response.data;
};
