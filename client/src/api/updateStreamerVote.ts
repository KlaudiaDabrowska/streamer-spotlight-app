import { apiClient } from "../config/apiConfig";

export enum VoteTypes {
  upvote = "upvote",
  downvote = "downvote",
}

export interface IUpdateVote {
  type: VoteTypes;
}

export const updateStreamerVote = async (type: IUpdateVote, id?: number) => {
  const response = await apiClient.put(`/streamers/${id}/vote`, type);
  return response.data;
};
