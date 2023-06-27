import { IconButton, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IStreamerObject } from "../../lib/types/Streamers";
import { useMutation } from "react-query";
import {
  IUpdateVote,
  VoteTypes,
  updateStreamerVote,
} from "../../api/updateStreamerVote";

export const Votes = ({
  streamer,
  refetch,
}: {
  streamer?: IStreamerObject;
  refetch: () => void;
}) => {
  const { mutate: updateStreamerVoteMutation } = useMutation(
    (type: IUpdateVote) => updateStreamerVote(type, streamer?.id),
    { onSuccess: () => refetch() }
  );

  return (
    <Stack flexDirection="row" justifyContent="center" gap={2}>
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() => updateStreamerVoteMutation({ type: VoteTypes.upvote })}
        >
          <ArrowUpwardIcon sx={{ color: "green" }} fontSize="small" />
        </IconButton>
        <Typography variant="h6">{streamer?.upvotes}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() =>
            updateStreamerVoteMutation({ type: VoteTypes.downvote })
          }
        >
          <ArrowDownwardIcon sx={{ color: "red" }} fontSize="small" />
        </IconButton>
        <Typography variant="h6">{streamer?.downvotes}</Typography>
      </Stack>
    </Stack>
  );
};
