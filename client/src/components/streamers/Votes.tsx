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

export const Votes = ({ streamer }: { streamer?: IStreamerObject }) => {
  const { mutate: updateStreamerVoteMutation } = useMutation(
    (type: IUpdateVote) => updateStreamerVote(type, streamer?.id)
  );

  return (
    <Stack flexDirection="row" justifyContent="center" gap={2}>
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() => updateStreamerVoteMutation({ type: VoteTypes.upvote })}
          data-testid="upvoteBtn"
        >
          <ArrowUpwardIcon sx={{ color: "green" }} fontSize="small" />
        </IconButton>
        <Typography variant="h6" data-testid="upvotes">
          {streamer?.upvotes}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() =>
            updateStreamerVoteMutation({ type: VoteTypes.downvote })
          }
          data-testid="downvoteBtn"
        >
          <ArrowDownwardIcon sx={{ color: "red" }} fontSize="small" />
        </IconButton>
        <Typography variant="h6" data-testid="downvotes">
          {streamer?.downvotes}
        </Typography>
      </Stack>
    </Stack>
  );
};
